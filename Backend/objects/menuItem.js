const mongoose = require('mongoose');
const menuItem = new mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String},
    price: {type: Number, required: true},
    category: {type: String},
});
module.exports = menuItem;