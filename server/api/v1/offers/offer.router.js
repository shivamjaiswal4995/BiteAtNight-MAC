const router = require('express').Router();
const offerController = require('./offer.controller');
const isAuthenticated = require('../auth/authController');

router.get('/allOffer', (req,res) => {
    offerController.getAllOffers((err, offers) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            console.log("getAllOffers of offercontroller success");
            res.status(200).json(offers);
        }
    })
});
//this method to be accessed only by admin...using scope..**
router.post('/addOffer', /*isAuthenticated,*/ (req,res) => {

    let offerObj = {

        offerName: req.body.offerName,
        userId: req.body.userId, //using for referal code... when some1 logging using referral codeof other person
        //an offer object will be created with userId of person whose referral code was used. 
        description: req.body.description,
        category: req.body.category,
    
    }

    offerController.addOffer(offerObj, (err, savedOffer) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedOffer);//what is use of sending saved order. Ans- as it will be displayed 
            //in offer section without refreshing the page.
        }
    })
});


router.delete('/:id', isAuthenticated, (req,res) => {

    let offerId = req.params.id;

    offerController.deleteItem(offerId, (err, deletedOffer) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(deletedOffer);
        }
    })

});
//while using isAuthenticated for admin, do we have to write a new block of code for verifying token or not?


//except from getting all the items, all methods in offer dao should be accessed by admin only. how to ensure hat?
module.exports = router;