const express = require('express');
const router = express.Router();
const portHoldings = require('../../controllers/portfolio_controller');
const Trade = require('../../controllers/trade_controller');


router.get('/', portHoldings.getHoldings);
router.post('/add', portHoldings.addToHoldings, Trade.makeTrade);
router.put('/update', portHoldings.updateHoldings, Trade.makeTrade);

module.exports = router;