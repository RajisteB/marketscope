const express = require('express');


let calculations = {};

calculations = {
  newTrade: function (req, res) {
    console.log('in the middleware!');  
    req.body.value = parseFloat((req.body.size * req.body.price));
  }
}

module.exports = calculations;