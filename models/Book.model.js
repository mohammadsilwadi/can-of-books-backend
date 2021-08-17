'use strict'
const mongoose=require("mongoose");
const bookSchema= new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    email:String,
},
);

const Book = mongoose.model('boo', bookSchema);

module.exports=Book;