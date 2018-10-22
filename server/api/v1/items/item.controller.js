const itemService = require('./item.service');

const getAllItems = (done) => {
    itemService.getAllItems(done);
}

const addItem = (itemObj, done) => {
    itemService.addItem(itemObj,done);
}

const deleteItem = (itemId, done) => {
    itemService.deleteItem(itemId,done);
}

const updateItem = (itemId, updateDetails, done) => {
    itemService.updateItem(itemId, updateDetails, done);
}

const getAllItemsByCategory = (done) => {
    itemService.getAllItemsByCategory(done);
}
module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    updateItem,
    getAllItemsByCategory
}