const addressDAO = require('./address.dao');

const getAllAddresses = (done) => {
    addressDAO.getAllAddresses(done);
}

const addAddress = (addressObj, done) => {
    addressDAO.addAddress(addressObj,done);
}

const deleteAddress = (addressId, done) => {
    addressDAO.deleteAddress(addressId,done);
}

const updateAddress = (addressId, updateDetails, done) => {
    addressDAO.updateAddress(addressId, updateDetails, done);
}

const getAddressesByUserId = (userId, done) => {
    addressDAO.getAddressesByUserId(userId, done);
}
module.exports = {
    getAllAddresses,
    addAddress,
    deleteAddress,
    updateAddress,
    getAddressesByUserId
}