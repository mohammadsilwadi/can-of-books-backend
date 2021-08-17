'use strict'
const BookModel=require("../models/Book.model");

const getBooks=(req,res)=>{
    BookModel.find({},(err,data)=>{
        if (err){
            res.send("error happend")
        }
        else{
            res.json(data)
        }
    });
}

module.exports=getBooks


