const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio_model');

 function getHoldings(req, res) {
  Portfolio.find()
  .then(items => res.json(items))
  .catch(err => console.log(err));
}

 function addToHoldings (req, res) {
  const port = new Portfolio({
    currentValue: req.body.currentValue,
    holdings: req.body.holdings,
  });
  port.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
}

module.exports = {
  getHoldings,
  addToHoldings,
}
