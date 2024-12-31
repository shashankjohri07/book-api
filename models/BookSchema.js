const  mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique : true,
    } , 
    author: {
        type: String,
        required: true,
    } ,
    publishedDate :{
        type: Date,
        default: Date.now,
    } ,
    genre: {
        type: String,
    } , 
    price : {
        type: Number,
        default: 49.99,
        validate : {
            validator : function (price){
                return price > 0;
            },
            message : 'Price should be greater than 0'
        }

    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', BookSchema );