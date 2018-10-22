const addressService = require('./address.service');

const getAllAddresses = (done) => {
    addressService.getAllAddresses(done);
}

const addAddress = (addressObj, done) => {
    addressService.addAddress(addressObj,done);
}

const deleteAddress = (addressId, done) => {
    addressService.deleteAddress(addressId,done);
}

const updateAddress = (addressId, updateDetails, done) => {
    addressService.updateAddress(addressId, updateDetails, done);
}

const getAddressesByUserId = (userId) => {
    addressService.getAddressesByUserId(userId, done);
}

module.exports = {
    getAllAddresses,
    addAddress,
    deleteAddress,
    updateAddress,
    getAddressesByUserId
}