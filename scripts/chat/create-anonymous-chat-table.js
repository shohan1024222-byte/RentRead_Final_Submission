const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAnonymousChatTable() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'rentread'
        });

        console.log('📦 Creating anonymous_chat table...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS anonymous_chat (
                id INT PRIMARY KEY AUTO_INCREMENT,
                session_id VARCHAR(100) NOT NULL,
                sender_type ENUM('guest', 'admin') NOT NULL,
                message TEXT NOT NULL,
                guest_name VARCHAR(100) DEFAULT 'Guest',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_session_id (session_id),
                INDEX idx_created_at (created_at)
            )
        `);

        console.log('✅ anonymous_chat table created successfully!');
        
        await connection.end();
    } catch (error) {
        console.error('❌ Error creating table:', error.message);
        process.exit(1);
    }
}

createAnonymousChatTable();
