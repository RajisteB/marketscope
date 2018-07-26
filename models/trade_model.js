const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = Trade = mongoose.model('trade', TradeSchema);