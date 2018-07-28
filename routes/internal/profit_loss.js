const express = require('express');
const router = express.Router();
const cash = require('../../controllers/profit_loss_controller');

router.get('/', cash.getCurrentPnL);

module.exports = router;
