const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    itemId: {type: String, required: true},
    itemName: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String, required: true},
    itemUrl: {type: String, required: true}

});
//this database should be accessed directly by admin so that items can be added and removed easily.

//itemSchema.index?
module.exports = mongoose.model('items', itemSchema);