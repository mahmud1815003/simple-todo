// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const todoSchema = mongoose.Schema({
    title: String,
    des: String,
}, {
    timestamps: true,
});


//Model

const todoModel = mongoose.model('TodoLists', todoSchema);


module.exports = {
    todoModel,
}