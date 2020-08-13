const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Setup PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Connect to MongolDB
connectDB();

// Init Bodyparser Middleware
app.use(express.json({ extended: false }));

// Test API
app.get('/', (req, res) => res.send('API running'));

// Define API routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/package', require('./routes/api/package'));
app.use('/api/notification', require('./routes/api/notification'));
app.use('/api/classes', require('./routes/api/classes'));
app.use('/api/booking', require('./routes/api/booking'));
app.use('/api/auth', require('./routes/api/auth'));

