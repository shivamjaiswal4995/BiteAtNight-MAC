const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
      
    orderId: {type: String, required: true},
    userId: {type: String, required: true},
    items: [{}],//with items quantity of each item is required.
    state_Of_order: {type: String, required: true},
    orderedOn: {type: Date, default: Date.now},
    totalCost: {type: Number, required:true},
    discount: {type: Number, required: true},
    tax: {type: Number, required: true},
    payabale_Amount: {type: Number, required: true}

});

//orderSchema.index({userId: 1, userName: 1, userEmail: 1}, {unique: true});

module.exports = mongoose.model('orders', orderSchema);