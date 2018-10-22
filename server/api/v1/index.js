const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const ordersRouter = require('./orders');
const offersRouter = require('./offers');
const itemsRouter = require('./items');
const addressesRouter = require('./addresses');

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/offers', offersRouter);
router.use('/items', itemsRouter);
router.use('/addresses', addressesRouter);

module.exports = router;