const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio_model');


 function getHoldings(req, res) {
  Portfolio.find()
  .then(items => res.json(items))
  .catch(err => console.log(err));
}

 function addToHoldings (req, res, next) {
  const port = new Portfolio({
    symbol: req.body.symbol,
    size: req.body.size,
    price: req.body.price,
    value: req.body.value
  });
  console.log('adding to holdings');
  port.save((err, item) => {
    err ? console.log(err) :
    res.write(JSON.stringify(item));
    next();
  })
}

function updateHoldings (req, res, next) {
  console.log('updating: ' + req.body.symbol);
  Portfolio.findOneAndUpdate({ symbol: req.body.symbol })
    .then(item => {
      let updatedItem = item.set({
        size: item.size += req.body.size,
        price: (item.value + req.body.value) / item.size,
        value: item.value += req.body.value
      });
      updatedItem.save((err, update) => {
        err ? console.log(err) :
        res.write(JSON.stringify(update));
        next();
      });
    });
}


module.exports = {
  getHoldings,
  addToHoldings,
  updateHoldings,
}
