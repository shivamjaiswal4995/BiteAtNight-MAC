const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

    addressId: {type: String, required:true},
    userId : {type: String, required: true},
    houseNo : {type: String, required: true},
    landmark : {type: String, required: true},
    type : {type: String, required: true},
    area :{type: String, required: true},
    city : {type: String, default: 'Indore'},
    state : {type: String, default: 'Madhya Pradesh'},
    pincode : {type: Number, default: 452001}

});


//addressSchema.index?
module.exports = mongoose.model('addresses', addressSchema);