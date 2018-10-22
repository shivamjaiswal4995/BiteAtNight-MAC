const itemModel =  require('./api/v1/items/item.entity');

console.log("before");

//data= itemModel.aggregate([{ $group : {_id :{category:"$category"}, items: {$push : "$$ROOT"}}}]);
itemModel.find({}, (err, data) => {
    if(err) {
        console.log("Error occurred while fetching details", err);
    } else if(!data) {
        console.log("No data found!");
    } else {
        console.log("hello");
        console.log(data);
    }
    
});

console.log("After");