const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const creatureRoutes = require('./routes/creatures'); // Uncomment this if you have the routes file ready

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017,{
mongoose.connect('mongodb://localhost:27020,localhost:27021,localhost:27022/cbit2?replicaSet=m101', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use creature routes
app.use('/creatures', creatureRoutes); // Uncomment this if you have the routes file ready

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
