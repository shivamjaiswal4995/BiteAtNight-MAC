const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({

    offerId: {type: String, required: true},
    userId: {type: String, required: false},
    offerName: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true}//3 types of category, a)personalreferal offer, b)all the discount offers c)combopack.

});

//offerSchema.index??

module.exports = mongoose.model('offers', offerSchema);