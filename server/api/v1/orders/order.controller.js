const orderService = require('./order.service');

const addOrder = (orderObj, done) => {
    orderService.addOrder(orderObj, done);
}

const findPreviousOrders = (userId, done) => {
    orderService.findPreviousOrders(userId, done);
}

const getAllOrders = (done) => {
    orderService.getAllOrders(done);
}

module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders
}