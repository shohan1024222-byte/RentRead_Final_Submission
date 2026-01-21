require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.herokuapp.com', 'https://yourapp.herokuapp.com']
    : ['http://localhost:3000', 'http://localhost:4000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Ensure img/covers directory exists
const uploadsDir = path.join(__dirname, 'public', 'img', 'covers');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Configure multer for book file uploads (PDF, PPTX)
const booksStorageDir = path.join(__dirname, 'storage', 'books');
if (!fs.existsSync(booksStorageDir)) {
  fs.mkdirSync(booksStorageDir, { recursive: true });
}

const bookStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, booksStorageDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'book-' + uniqueSuffix + ext);
  }
});

const bookUpload = multer({
  storage: bookStorage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for books
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and PPTX files are allowed!'), false);
    }
  }
});

// Database connection with error handling
let db = null;
try {
  db = require('./db');
  console.log('✅ Database connection initialized successfully');
} catch (error) {
  console.warn('⚠️  Database connection failed, running with limited functionality:', error.message);
  console.log('💡 Some features may be limited without database connection');
}

// Load API routes if database is available
if (db) {
  try {
    const authRoutes = require('./routes/auth');
    const booksRoutes = require('./routes/books');
    const rentRoutes = require('./routes/rent');
    const adminRoutes = require('./routes/admin');
    const chatRoutes = require('./routes/chat');
    
    app.use('/api/auth', authRoutes);
    app.use('/api/books', booksRoutes);
    app.use('/api/rent', rentRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/chat', chatRoutes);
    console.log('✅ API routes loaded successfully');
  } catch (error) {
    console.warn('⚠️  Failed to load some routes:', error.message);
  }
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Return just the filename (will be prefixed with /img/covers/ in frontend)
    const filename = req.file.filename;
    
    res.json({ 
      success: true, 
      filename: filename,
      path: `/img/covers/${filename}`,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed: ' + error.message });
  }
});

// Book file upload endpoint (PDF, PPTX)
app.post('/api/upload-book', bookUpload.single('bookfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const filename = req.file.filename;
    const fileSizeMB = (req.file.size / (1024 * 1024)).toFixed(2);
    
    res.json({ 
      success: true, 
      filename: filename,
      path: `/storage/books/${filename}`,
      size: fileSizeMB + ' MB',
      message: 'Book file uploaded successfully' 
    });
  } catch (error) {
    console.error('Book upload error:', error);
    res.status(500).json({ success: false, error: 'Book upload failed: ' + error.message });
  }
});

// Serve book files from storage/books directory
app.use('/storage/books', express.static(path.join(__dirname, 'storage', 'books')));

// Fallback APIs when database is not available
if (!db) {
  // In-memory books for demo purposes
  let _memoryBooks = [
    { 
      id: 1, 
      title: 'C Programming (Bangla)', 
      description: 'Complete C programming guide in Bengali', 
      filename: '', 
      author: 'Programming Expert', 
      price_per_day: 10, 
      category: 'Computer Science', 
      total_pages: 200, 
      is_available: 1, 
      image_url: '/img/c_programming_ba.svg' 
    },
    { 
      id: 2, 
      title: 'Data Structure (Bangla)', 
      description: 'Comprehensive data structures guide', 
      filename: '', 
      author: 'Algorithm Expert', 
      price_per_day: 12, 
      category: 'Computer Science', 
      total_pages: 250, 
      is_available: 1, 
      image_url: '/img/data_structure_ba.svg' 
    }
  ];

  // Fallback book endpoints
  app.get('/api/books', (req, res) => {
    const q = req.query.q;
    let list = _memoryBooks.slice().reverse();
    if (q) {
      const term = q.toLowerCase();
      list = list.filter(b => 
        (b.title||'').toLowerCase().includes(term) || 
        (b.category||'').toLowerCase().includes(term) || 
        (b.author||'').toLowerCase().includes(term)
      );
    }
    res.json({ success: true, books: list });
  });

  app.post('/api/books', (req, res) => {
    const body = req.body || {};
    const id = (_memoryBooks.reduce((m,b)=>Math.max(m,b.id), 0) || 0) + 1;
    const book = { 
      id, 
      title: body.title||'Untitled', 
      description: body.description||'', 
      filename: body.filename||'', 
      author: body.author||'', 
      price_per_day: body.price_per_day||0, 
      category: body.category||'', 
      total_pages: body.total_pages||0, 
      is_available: body.is_available?1:0, 
      image_url: body.image_url||null 
    };
    _memoryBooks.push(book);
    res.json({ success: true, book });
  });

  app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id,10);
    const idx = _memoryBooks.findIndex(b=>b.id===id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Book not found' });
    const body = req.body || {};
    _memoryBooks[idx] = { ..._memoryBooks[idx], ...body, id };
    res.json({ success: true, book: _memoryBooks[idx] });
  });

  app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id,10);
    const idx = _memoryBooks.findIndex(b=>b.id===id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Book not found' });
    _memoryBooks.splice(idx,1);
    res.json({ success: true, deletedId: id });
  });

  // Fallback rental endpoints
  app.post('/api/rent-book', (req, res) => {
    res.json({ 
      success: false, 
      message: 'Database not available. Please configure database connection for full functionality.' 
    });
  });
  
  app.get('/api/my-rentals', (req, res) => {
    res.json({ 
      success: true, 
      rentals: [], 
      message: 'Database not available - no rental history available' 
    });
  });
  
  app.post('/api/track-access/:rentalId', (req, res) => {
    res.json({ 
      success: false, 
      message: 'Database not available for tracking' 
    });
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: db ? 'Connected' : 'Not Available',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    message: 'RentRead server is running successfully'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    service: 'RentRead API',
    version: '1.0.0',
    database: db ? 'Connected' : 'Offline',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Catch all route for frontend (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up background job for rental expiration (only if database available)
if (db) {
  try {
    const { expireOldRentals } = require('./utils/cleanup');
    cron.schedule('*/5 * * * *', async () => { // Every 5 minutes
      try {
        await expireOldRentals();
        console.log('✅ Expired rentals cleanup completed');
      } catch (err) {
        console.error('❌ Error during rental expiration:', err);
      }
    });
    console.log('✅ Background cleanup job scheduled');
  } catch (error) {
    console.warn('⚠️  Failed to set up background job:', error.message);
  }
}

// Port configuration for Heroku
const PORT = process.env.PORT || 4000;

// Start server with comprehensive error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀====================================🚀');
  console.log(`📚 RentRead Server Started Successfully`);
  console.log(`🌐 Port: ${PORT}`);
  console.log(`🔗 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Database: ${db ? '✅ Connected' : '⚠️  Not Available'}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌍 Production URL: https://your-app-name.herokuapp.com`);
  } else {
    console.log(`🏠 Local URL: http://localhost:${PORT}`);
  }
  
  console.log(`🔍 Health Check: /health`);
  console.log(`📊 API Status: /api/status`);
  console.log('🚀====================================🚀');
  
  if (!db) {
    console.log('');
    console.log('💡 NOTICE: Running with limited functionality');
    console.log('   To enable full features, configure database connection');
    console.log('   Set environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    console.log('');
  }
});

// Enhanced error handling
server.on('error', (error) => {
  console.error('🚨====================================🚨');
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('💡 Suggestions:');
    console.log('   - Stop other servers running on this port');
    console.log('   - Use a different PORT environment variable');
    console.log('   - Kill processes: netstat -ano | findstr :' + PORT);
  } else if (error.code === 'EACCES') {
    console.error(`❌ Permission denied on port ${PORT}`);
    console.log('💡 Try using a port number above 1024');
  } else {
    console.error('❌ Server startup error:', error.message);
  }
  console.error('🚨====================================🚨');
  process.exit(1);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  server.close((error) => {
    if (error) {
      console.error('❌ Error during server shutdown:', error);
      process.exit(1);
    }
    
    console.log('✅ Server closed successfully');
    
    // Close database connection if available
    if (db && db.end) {
      db.end(() => {
        console.log('✅ Database connection closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Promise Rejection:', reason);
  console.error('   At Promise:', promise);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

module.exports = app;