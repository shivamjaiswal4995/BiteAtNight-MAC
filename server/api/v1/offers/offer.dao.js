const offerModel = require('./offer.entity');
const uuidv4 = require('uuid/v4');

const addOffer = (offerObj, done) => {

    let newOffer = new offerModel({

        offerId: uuidv4(),
        userId: offerObj.userId,
        offerName: offerObj.offerName,
        description: offerObj.description,
        category: offerObj.category
    })

    newOffer.save( (err, savedOffer) =>{

        if(err){
            return done(err);
        }
        else{
            return done(null, savedOffer);//why are we returning savedOffer?
        }

    })
};

const getAllOffers = (done) => { //this method would be called by clicking on a button, how to write router for this?

    offerModel.find({}, (err, offers) => {
        if(err){
            return done(err);
        }
        else {
            console.log(offers);
            return done(null, offers);
        }
    })
};

const removeOffer = (offerId, done) => {

    offerModel.findOneandRemove({offerId : offerId}, (err, offer) =>{
        if(err){
            return done(err);
        }
        else if(!offer){

            let errObj = {
                message: 'Offer not found'
            }
            return done(errObj);
        }
        else{
            return done(null, item);
        }
    })
};

module.exports = {
    addOffer,
    getAllOffers,
    removeOffer
}
//apart from getAllOffer, remove offer and addoOffer will be accessed by admin.