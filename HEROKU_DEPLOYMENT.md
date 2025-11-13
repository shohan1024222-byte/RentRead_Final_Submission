# RentRead - Heroku Deployment Guide

## Files Created for Heroku Deployment

### 1. `app.js` - Main Application File
- Optimized for Heroku with proper port binding (`0.0.0.0`)
- Enhanced error handling and logging
- Graceful shutdown handling
- Environment-specific CORS configuration
- Health check and status endpoints

### 2. `package.json` - Updated Dependencies
- Changed main entry point from `server.js` to `app.js`
- Added Node.js and npm version requirements
- Added Heroku-specific build scripts
- Enhanced metadata for better deployment

### 3. `Procfile` - Heroku Process Configuration
- Specifies how to run your application on Heroku
- Tells Heroku to run `node app.js` as a web process

### 4. `.env.production` - Production Environment Template
- Template for production environment variables
- Includes database configuration options
- Ready for Heroku config vars

## Heroku Deployment Steps

### Step 1: Install Heroku CLI
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
heroku create your-app-name
# Replace 'your-app-name' with your desired app name
```

### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secure-jwt-secret-here
heroku config:set DB_HOST=your-database-host
heroku config:set DB_USER=your-database-username
heroku config:set DB_PASSWORD=your-database-password
heroku config:set DB_NAME=rentread
```

### Step 5: Add Database (Optional)
```bash
# Option 1: ClearDB MySQL
heroku addons:create cleardb:ignite

# Option 2: JawsDB MySQL
heroku addons:create jawsdb:kitefin

# Get database URL
heroku config:get CLEARDB_DATABASE_URL
# or
heroku config:get JAWSDB_URL
```

### Step 6: Deploy to Heroku
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Heroku deployment"

# Add Heroku remote
heroku git:remote -a your-app-name

# Deploy
git push heroku main
```

### Step 7: Open Your App
```bash
heroku open
```

## Important Notes

1. **Database**: The app will work without a database but with limited functionality
2. **File Storage**: Heroku's filesystem is ephemeral - uploaded files may be lost
3. **Environment Variables**: Set all required environment variables in Heroku dashboard
4. **Domain**: Your app will be available at `https://your-app-name.herokuapp.com`

## Monitoring

- **Logs**: `heroku logs --tail`
- **Status**: Visit `/health` endpoint
- **API Status**: Visit `/api/status` endpoint

## Troubleshooting

1. **App Crashes**: Check logs with `heroku logs --tail`
2. **Database Issues**: Verify environment variables with `heroku config`
3. **Build Failures**: Check package.json dependencies

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure database connection
- [ ] Set NODE_ENV=production
- [ ] Test all endpoints after deployment
- [ ] Set up database tables if using MySQL add-on
- [ ] Configure custom domain (if needed)

Your RentRead application is now ready for Heroku deployment!