const express = require('express');
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
  let updatedItem = null;
  console.log('updating: ' + req.body.symbol);
  Portfolio.findOneAndUpdate({ symbol: req.body.symbol })
    .then(item => {

      if (item.size - req.body.size === 0 || item.size + req.body.size === 0 ){
        item.remove((err, item) => {
          err ? console.log(err) :
          res.write("deleted...");
          next();
        });
      } else {
        switch(req.body.order) {
  
          // case when the order is a buy
          case "BOT":
            updatedItem = item.set({
              size: item.size += req.body.size,
              price: (item.value + req.body.value) / item.size,
              value: item.value += req.body.value
            });
            break;
  
          // case when order is a sell to exit long position
          case "SLD":
            updatedItem = item.set({
              value: item.size * item.price,
              size: item.size -= req.body.size,
              price: item.price,
            });
            break;
  
          // case when order is a short
          case "SHRT":
            updatedItem = item.set({
              size: item.size -= req.body.size,
              price: (item.value + req.body.value) / (item.size * -1),
              value: item.value += req.body.value
            });
            break;
  
          // case when order is a cover to exit short position
          case "COVER":
          updatedItem = item.set({
            value: item.size * item.price,
            size: item.size += req.body.size,
            price: item.price,
          });
            break;
          
          // default
          default: 
            console.log("Please enter an order...");
        }

        // send to db without setting headers, next for trade middleware
        updatedItem.save((err, update) => {
          err ? console.log(err) :
          res.write(JSON.stringify(update));
          next();
        });
      }

    });
}


module.exports = {
  getHoldings,
  addToHoldings,
  updateHoldings,
}
