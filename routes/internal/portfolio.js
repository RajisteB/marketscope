const express = require('express');
const router = express.Router();
const portHoldings = require('../../controllers/portfolio_controller');
const Trade = require('../../controllers/trade_controller');
const PnL = require('../../controllers/profit_loss_controller');

router.get('/', portHoldings.getHoldings);
router.post('/add', PnL.calculateCurrentPnL, portHoldings.addToHoldings, Trade.makeTrade);
router.put('/update', PnL.calculateCurrentPnL, portHoldings.updateHoldings, Trade.makeTrade);

module.exports = router;