require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const authRoutes = require('./routes/auth.js');
const adminRoutes = require('./routes/admin.js');
const imageRoutes = require('./routes/image.js');
const updateRoutes = require('./routes/update.js');
const videoRoutes = require('./routes/video.js');
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
app.use('/api', videoRoutes);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});
