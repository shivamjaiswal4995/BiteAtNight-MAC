const router = require('express').Router();
const orderController = require('./order.controller');
const isAuthenticated = require('../auth/authController');

//this method will be accessed by admin only
router.get('/', isAuthenticated, (req,res) => {
    orderController.getAllOrders((err, orders)=> {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(orders);
        }
    })
});

//as we click Place Order button, this would be called.
router.post('/addOrder', isAuthenticated, (req,res) => {
    
    let orderObj = {
        
        userId: req.body.userId,
        items: req.body.items,//with items quantity of each item is required...
        state_Of_order: req.body.state_Of_order,
        orderedOn: req.body.orderedOn,
        totalCost: req.body.totalCost,
        discount: req.body.discount,
        tax: req.body.tax,
        payabale_Amount: req.body.payabale_Amount
    }

    orderController.addOrder(orderObj, (err, savedOrder) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedOrder);//what is use of sending saved order.
        }
    })
});

router.get('/previousOrder', isAuthenticated, (req,res) => {

    let userId = req.body.userId;
//here we are not mentoning done in arguments?
    orderController.findPreviousOrders(userId, (err,orders) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(orders);
        }
    })
});

module.exports = router;