const offerDAO = require('./offer.dao');

const addOffer = (offerObj, done) => {

    offerDAO.addOffer(offerObj, done);
}

const deleteOffer = (offerId, done) => {
    offerDAO.deleteOffer(offerId, done);
}

const getAllOffers = (done) => {
    offerDAO.getAllOffers(done);
}

module.exports = {

    addOffer,
    deleteOffer,
    getAllOffers
}