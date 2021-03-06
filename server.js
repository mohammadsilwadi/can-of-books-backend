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
const {getBooks,createBookController,deleteBookController}=require("./controllers/Book.controller")
const PORT=process.env.PORT
mongoose.connect('mongodb://localhost:27017/mongoDemo', {useNewUrlParser: true,  useUnifiedTopology: true });
const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

const getKey=(header, callback)=>{
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
}
app.get('/test',(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,getKey,{},(err,user)=>{
        if(err){
            res.send('invalid token');
        }
        res.send(user)
    })
});
app.get('/book',getBooks);
app.post("/create-book",createBookController);
app.delete("/delete-book/:id",deleteBookController);
app.listen(PORT,()=>{
    console.log(`listining on port ${PORT} `);
})
