const BookModel=require("../models/Book.model");

const bookController=(req,res)=>{
    const newBook=new BookModel(
   
        {

            title:"NO PLACE LIKE HERE",
            description:"Ashlyn Zanotti has big plans for the summer. She’s just spent a year at boarding school and can’t wait to get home.",
            bookType:"novel",
            email:"@gmail.com" 
        },
    )
    newBook.save();
    res.send(newBook);
    console.log(newBook);
}


module.exports=bookController


