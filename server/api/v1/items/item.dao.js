const itemModel = require('./item.entity');
const uuidv4 = require('uuid/v4');

const getAllItems = (done) => {

    itemModel.find({}, (err, items) =>{
        if(err){
            return done(err);
        }
        else{
            return done(null, items);
        }

    })
};

const getAllItemsByCategory = (done) => {
    itemModel.aggregate(
        [
            { $group : {_id :{category:"$category"}, items: {$push : "$$ROOT"}}}
        ]
    , (err,items) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, items);
        }
    });
}

const addItem = (itemObject, done) => {

    let newItem = new itemModel({

        itemId: uuidv4(),
        itemName: itemObject.itemName,
        category: itemObject.category,
        price: itemObject.price,
        type: itemObject.type,
        itemUrl: itemObject.itemUrl
    }) 

    newItem.save((err,savedItem) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, savedItem);
        }
    })
};

const deleteItem = (itemId, done) => {

    itemModel.findOneAndRemove({itemId: itemId}, (err,item) => {
        if(err){
            done(err);
        }
        else if(!item){
            let errObj = {
                message: 'No item found'
            }
            return done(errObj);
        }
        else{
            return done(null, item); //y are we returning item in argument of done?
        }
    } )
};

const updateItem = (itemId, updateDetails, done) => {

    let update = updateDetails;
    itemModel.findOneAndUpdate({itemId: itemId}, 
    { $set: update},
    {new: true},//y are we using this?
    (err,updatedItem) => {

        if(err){
            return done(null);
        }
        else if(!itemId){
            let errObj = {
                message: 'Item not found'
            }
            return done(errObj);
        }

        else{
            return done(null, updatedItem); //why are we returning updatedItem in done?
        }
    })
};

module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    updateItem,
    getAllItemsByCategory
}