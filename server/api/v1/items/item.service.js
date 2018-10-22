const itemDAO = require('./item.dao');

const getAllItems = (done) => {
    itemDAO.getAllItems(done);
}

const addItem = (itemObj, done) => {
    itemDAO.addItem(itemObj,done);
}

const deleteItem = (itemId, done) => {
    itemDAO.deleteItem(itemId,done);
}

const updateItem = (itemId, updateDetails, done) => {
    itemDAO.updateItem(itemId, updateDetails, done);
}

const getAllItemsByCategory = (done) => {
    itemDAO.getAllItemsByCategory(done);
}
module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    updateItem,
    getAllItemsByCategory
}