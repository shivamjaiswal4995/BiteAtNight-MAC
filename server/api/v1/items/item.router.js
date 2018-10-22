const router = require('express').Router();
const itemController = require('./item.controller');
const isAuthenticated = require('../auth/authController');

router.get('/', (req,res) => {
    itemController.getAllItems((err, items) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(items);
        }
    });
});

router.get('/byCategory', (req,res) => {
    itemController.getAllItemsByCategory((err, items) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(items);
        }
    });
});

router.post('/addItem',/* isAuthenticated,*/ (req,res) => {

    let itemObj = {
        itemName: req.body.itemName,
        category: req.body.category,
        price: req.body.price,
        type: req.body.type,
        itemUrl: req.body.itemUrl
    }
    itemController.addItem(itemObj, (err, savedItem) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedItem);//what is use of sending saved order.
        }
    })
});

router.put('/:id', isAuthenticated, (req, res) => {
    //there would be a button in admin website to delete or update items. if admin clicks on updateItems,
    //a new page will be opened with spaces to fill itemId and details of properties to be cahnged.
    //if admin wants to delete an item, a space would be providedd to fill itemId.

    let itemId = req.params.id;
    let updateDetails = {};
//upDateDetails must come embedded in req object?
    itemController.updateItemDetails( itemId, updateDetails, (err, updatedItem) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(updatedItem);
        }
    })
});

router.delete('/:id', isAuthenticated, (req,res) => {

    let itemId = req.params.id;

    itemController.deleteItem(itemId, (err, deletedItem) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(deletedItem);
        }
    })

});
//while using isAuthenticated for admin, do we have to write a new block of code for verifying token or not?

//in updating and deletinng items from database, what type of req should we use? get, post,put??
//except from getting all the items, all methods in item dao should be accessed by admin only. how to ensure hat?
module.exports = router;