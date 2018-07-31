const express = require('express');
const router = express.Router();
const Trade = require('../../controllers/trade_controller');

router.get('/', Trade.getTrades);

module.exports = router;