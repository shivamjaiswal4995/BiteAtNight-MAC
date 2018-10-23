const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userEmail: {type: String, required: true},
    password: {type: String, required: true},
    contact: {type: Number, required: true},
    addresses: [{}],
    orders: [{}],
    cart : [{}]
    // referralCode : {type: String, required: true},
    // referrralPoints : {type : Number, required : true}
});

userSchema.index({userId: 1, userName: 1, userEmail: 1}, {unique: true});

module.exports = mongoose.model('users', userSchema);