const offerService = require('./offer.service');

const addOffer = (offerObj, done) => {

    offerService.addOffer(offerObj, done);
}

const deleteOffer = (offerId, done) => {
    offerService.deleteOffer(offerId, done);
}

const getAllOffers = (done) => {
    offerService.getAllOffers(done);
}

module.exports = {

    addOffer,
    deleteOffer,
    getAllOffers
}