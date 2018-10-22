const orderModel = require('./order.entity');
const uuidv4 = require('uuid/v4');

const addOrder = (orderObj,done) => {

    let newOrder = new orderModel({

        orderId: uuidv4(),
        userId: orderObj.userId,
        items: orderObj.items,//with items quantity of each item is required..
        state_Of_order: orderObj.state_Of_order,
        orderedOn: orderObj.orderedOn,
        totalCost: orderObj.totalCost,
        discount: orderObj.discount,
        tax: orderObj.tax,
        payabale_Amount: orderObj.payabale_Amount

    });

    newOrder.save((err, savedOrder) => {

        if(err){
            return done(err);
        }
        else{
            return done(null, savedOrder);
        }
    })
};

const findPreviousOrders = (userId, done) => {

    userModel.find( {userId: userId}, (err, orders) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, orders);
        }
    })
};
//can be used for analysis purpose.
const getAllOrders = (done) => {

    userModel.find( (err,orders) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, orders);
        }
    })
};

//write a method to update the status of order once it is delivered. to be used by dellivery guy
//as delivery guy click on delivered button.... this method would be called and status of order is updated in database. 
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders
}