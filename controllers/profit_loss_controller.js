const express = require('express');
const pnl = require('../models/profit_loss_model');

/* 
Mongoose only creates collections when there is data added.
On the initial start PnL, you cannot modify/update a non-
existing collection, thus the starting PnL collection is 
added manually to the db.
*/

// function calculateStartPnL(req, res, next) {
//   console.log('calculating starting PnL...');
//   let profits = new pnl({
//     initial: 1000000,
//     current: 1000000 - (req.body.size * req.body.price) 
//   });
//   profits.save((err, profit) => {
//     err ? console.log(err) :
//     res.write(JSON.stringify(profit));
//     next();
//   });
// }

function calculateCurrentPnL(req, res, next) {
  let updatedAmt = null;
  console.log('calculating current PnL...');
  pnl.findOneAndUpdate({ initial: 1000000 })
    .then(amt => {
      let order = req.body.order;
      order === "BOT" || order === "SHRT" ?
      updatedAmt = amt.set({
        current: amt.current -= req.body.value 
      }) :
      updatedAmt = amt.set({
        current: amt.current += req.body.value
      });
      updatedAmt.save((err, profit) => {
        err ? console.log(err) :
        res.write(JSON.stringify(profit));
        next();
      });
    });
}

function getCurrentPnL(req, res) {
  pnl.find()
  .then(value => res.json(value))
  .catch(err => console.log(err));
}


module.exports = {
  calculateCurrentPnL,
  getCurrentPnL
}