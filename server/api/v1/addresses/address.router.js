const router = require('express').Router();
const addressController = require('./address.controller');
const isAuthenticated = require('../auth/authController');

router.get('/', (req,res) => {
    addressController.getAllAddresses((err, addresses) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(addresses);
        }
    })
});
 
router.get('/byuser',isAuthenticated, (req,res) => {
    let userId = req.params.userId;
    console.log("addressRoter reached while getting addresses by user");
    addressController.getAddressesByUserId(req.userId, (err,addresses) => {
        
        if(err){
            res.status(500).send(err);
        }
        else{
            console.log(addresses);
            res.status(200).json(addresses);
        }
    })
});
router.post('/addaddress', /*isAuthenticated,*/ (req,res) => {

    let addressObj = {
    
        userId : req.userId,
        //req.userId is described in isAuthenticated...
        houseNo : req.body.houseNo,
        landmark : req.body.landmark,
        type : req.body.type,
        area : req.body.area,
       
    }
    addressController.addAddress(addressObj, (err, savedAddress) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedAddress);
        }
    })
});

router.put('/:id', isAuthenticated, (req, res) => {
    //there would be a button in admin website to delete or update items. if admin clicks on updateItems,
    //a new page will be opened with spaces to fill itemId and details of properties to be cahnged.
    //if admin wants to delete an item, a space would be providedd to fill itemId.

    let addressId = req.params.id;
    let updateDetails = {};
    if(req.body.huseNo){
        updateDetails.houseNo = req.body.houseNo;
    }
    if(req.body.area){
        updateDetails.area = req.body.area;
    }
    if(req.body.landmark){
        updateDetails.landmark = req.body.landmark;
    }
    if(req.body.type){
        updateDetails.type = req.body.type;
    }

//upDateDetails must come embedded in req object?
//TODO
//whileediting note in Keep, userId and NoteId is both provided in so that while findOneAndUpdate method in Dao, both can be 
//provided in condition. not necessay as it can be found only on basis of addressId...
    addressController.updateItemDetails( addressId, updateDetails, (err, updatedAddress) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(updatedAddress);
        }
    })
});

router.delete('/:id', isAuthenticated, (req,res) => {

    let addressId = req.params.id;

    addressController.deleteAddress(addressId, (err, deletedAddress) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(deletedAddress); //what is use of returning deleted item.
        }
    })

});
//while using isAuthenticated for admin, do we have to write a new block of code for verifying token or not?

//in updating and deletinng items from database, what type of req should we use? get, post,put??
//except from getting all the items, all methods in item dao should be accessed by admin only. how to ensure hat?
module.exports = router;