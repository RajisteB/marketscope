const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require('./routes/external/data');
const portfolio = require('./routes/internal/portfolio');

// Init App
const app = express();
app.use(bodyParser.json());

// Connect to Mongoose
const db = require('./config/keys').mongoURI;
mongoose 
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
  
// Routes
app.use('/search', data);
app.use('/portfolio', portfolio);
// Set Port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}`));
