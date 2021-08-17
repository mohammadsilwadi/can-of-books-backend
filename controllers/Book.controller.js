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
const createBookController= (req,res)=>{
    let data={
        title:req.body["title"],
        description:req.body["description"],
        status:req.body["status"],
        age:req.body["email"]
    }
    let newBook= new BookModel(data);
    newBook.save().then(    
        res.json({message:"user created succefully",book:newBook})
    )
}

const deleteBookController=(req,res)=>{
    let bookId=req.params["id"];
    BookModel.findByIdAndDelete({_id:bookId},(err,data)=>{
        if (err){
            res.send("error occured");
        }
        console.log(bookId);
        res.send("book deleted");
    })
}
module.exports={getBooks,createBookController,deleteBookController}


