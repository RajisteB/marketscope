const express = require('express');
const router = express.Router();
const portHoldings = require('../../controllers/portfolio_controller');

router.get('/', portHoldings.getHoldings);
router.post('/', portHoldings.addToHoldings);

module.exports = router;