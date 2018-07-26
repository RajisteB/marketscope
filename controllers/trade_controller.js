const express = require('express');
const router = express.Router();
const Trades = require('../models/trade_model');

function getTrades(req, res) {
  Trades.find()
    .then(trades => res.json(trades))
    .catch(err => console.log(err));
};

function makeTrade(req, res) {
  let newTrade = new Trades({
    symbol: req.body.symbol,
    price: req.body.price,
    size: req.body.size,
    order: req.body.order,
    value: req.body.value
  });
  console.log('making a trade');
  newTrade.save((err, trade) => {
    err ? console.log(err) :
    res.write(JSON.stringify(trade));
    res.end();
  })
};

module.exports = {
  getTrades,
  makeTrade
}