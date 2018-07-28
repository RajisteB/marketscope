const express = require('express');
const router = express.Router();
const marketHelper = require('../../services/helpers/market-helper');

router.get('/marketdata/:id', marketHelper.getMarketData);
router.get('/chart/:id', marketHelper.getChartData);
router.get('/company/:id', marketHelper.getCompanyData);
router.get('/tops', marketHelper.getTops);
router.get('/batch/:id', marketHelper.getBatchQuotes)

module.exports = router;