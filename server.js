"use strict";
const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const jwt=require("jsonwebtoken");
const jwksClient=require("jwks-rsa");
const mongoose=require("mongoose");
const {getBooks,createBookController,deleteBookController,updateBookController,testBooks}=require("./controllers/Book.controller")
const PORT=process.env.PORT
mongoose.connect('mongodb://localhost:27017/mongoDemo', {useNewUrlParser: true,  useUnifiedTopology: true });
app.get('/test',testBooks);
app.get('/book',getBooks);
app.post("/create-book",createBookController);
app.delete("/delete-book/:id",deleteBookController);
app.delete("/update-book/:id",updateBookController);
app.listen(PORT,()=>{
    console.log(`listining on port ${PORT} `);
})
