'use strict'
const BookModel = require("../models/Book.model");
const { jwt, getKey } = require("../helper/jwtHandler");

const testBooks=(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,getKey,{},(err,user)=>{
        if(err){
            res.send('invalid token');
        }
        res.send(user)
    })}
const getBooks = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    jwt.verify(token, getKey, {}, (err, book) => {
        if (err) {
            res.send("auth failed");
        } else {
            BookModel.find({}, (err, data) => {
                if (err) {
                    res.send("error happend")
                }
                else {
                    res.json(data)
                }
            })
        }

    })
}
const createBookController = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    let data = {
        title: req.body["title"],
        description: req.body["description"],
        status: req.body["status"],
        age: req.body["email"]
    }
    jwt.verify(token, getKey, {}, (err, book) => {
        if (err) {
            res.send("auth failed");
        } else {
            let newBook = new BookModel(data);
            newBook.save().then(
                res.json({ message: "book created succefully", book: newBook })
            )
        }
    })
}

function deleteBookController(req, res){
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    let bookId =req.params["id"];
    // add fillter and email
    jwt.verify(token, getKey, {}, (err, book) => {
        if (err) {
            res.send("auth failed");
        } else {
            BookModel.findByIdAndDelete({ _id:bookId }, (err, data) => {
                if (err) {
                    res.send("error occured");
                }
                console.log(bookId);
                res.send("book deleted");
            })
        }
    })
}
const updateBookController = (req, res) => {
    let bookId = req.params.id;
    let bookData = req.body;
    console.log(bookId);
    jwt.verify(token, getKey, {}, (err, book) => {
        if (err) {
            res.send("auth failed");
        } else {
            BookModel.findOne({ _id: bookId }, (err, book) => {
                if (err) {
                    res.send("error occured");
                }
                book.title = bookData.title;
                book.description = bookData.description;
                book.email = bookData.email;
                book.save();
                res.json(book);
            })
        }
    })
}
module.exports = { getBooks, createBookController, deleteBookController, updateBookController,testBooks }


