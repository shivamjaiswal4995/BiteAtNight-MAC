const orderDao = require('./order.dao');

const addOrder = (orderObj, done) => {
    orderDao.addOrder(orderObj, done);
}

const findPreviousOrders = (userId, done) => {
    orderDao.findPreviousOrders(userId, done);
}

const getAllOrders = (done) => {
    orderDao.getAllOrders(done);
}

module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders
}