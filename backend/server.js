const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/auth.js');
const adminRoutes = require('./routes/admin.js');
const imageRoutes = require('./routes/image.js');
const updateRoutes = require('./routes/update.js');
app.use(cors())
app.use(express.json({extended: false}));
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI+"/MainDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', imageRoutes);
app.use('/api', updateRoutes);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
