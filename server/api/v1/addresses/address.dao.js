//justabove place order button, a deliver to column would be there(previous address at which order was delivered )
//should be mentioned in that column) and side by side a scroll button should be there deliver to other address..
//when click on that, choose fom previous address and add new address option should be available.

const addressModel = require('./address.entity');
const uuidv4 = require('uuid/v4');

const addAddress = (addressObj,done) => {

    let newAddress = new addressModel({

        addressId: uuidv4(),
        userId: addressObj.userId,
        houseNo : addressObj.houseNo,
        landmark : addressObj.landmark,
        type : addressObj.type,
        area : addressObj.area,
        

    });

    newAddress.save((err, savedAddress) => {

        if(err){
            return done(err);
        }
        else{
            return done(null, savedAddress);
        }
    })
};

const getAllAddresses = (done) => {

    addressModel.find( (err,addresses) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, addresses);
        }
    })
};

const updateAddress = (addressId, updateDetails, done) => {

    let update = updateDetails;
    addressModel.findOneAndUpdate({addressId: addressId}, 
    { $set: update},
    {new: true},//y are we using this?
    (err,updatedAddress) => {

        if(err){
            return done(null);
        }
        else if(!addressId){
            let errObj = {
                message: 'Address not found'
            }
            return done(errObj);
        }

        else{
            return done(null, updatedAddress); //why are we returning updatedItem in done ans. so it can be shown 
            //without need of refreshing page.
        }
    })
};

const deleteAddress = (addressId) => {

    addressModel.findOneAndRemove({addressId: addressId}, (err,address) => {
        if(err){
            done(err);
        }
        else if(!address){
            let errObj = {
                message: 'No Address found'
            }
            return done(errObj);
        }
        else{
            return done(null, address); //y are we returning item in argument of done?
        }
    } )
};

const getAddressesByUserId = (userId,done) =>{
    console.log("getAddressesByUserId in address dao");
    addressModel.find( {userId: userId}, (err, addresses) => {
        if(err){
            return done(err);
        } else if (!addresses){
            let errObj = {
                message : "No address of user found"
            }
            return done(errObj);
        }
        else{
            return done(null, addresses);
        }
    })
};

module.exports = {
    getAllAddresses,
    deleteAddress,
    updateAddress,
    addAddress,
    getAddressesByUserId
}

