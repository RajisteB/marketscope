const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfitLossSchema = {
  initial: {
    type: Number,
    default: 1000000,
  },
  current: {
    type: Number,
    default: 20,
  }
}

module.exports = Pnl = mongoose.model('pnl', ProfitLossSchema);
