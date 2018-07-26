const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  symbol: {
    type: String, required: true
  },
  size: {
    type: Number, required: true
  },
  price: {
    type: Number, required: true
  },
  value: {
    type: Number, required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);