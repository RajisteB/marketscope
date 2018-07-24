const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const portfolio = require('./routes/internal/portfolio');


const app = express();
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

mongoose 
  .connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/portfolio', portfolio);