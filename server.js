const express = require("express")
const mongoose = require('mongoose');

const app = express()
const port = 3000

//connect to mongoose
mongoose.connect('mongodb://localhost/myDatabase', { useNewUrlParser:true, useUnifiedTopology: true});

const db = mongoose.connection
db.on("error", console
    .error.blind(console, "Mongodb connection error:"))
db.once("open",() => {
    console.log ("connected to mongodb successfully")
})
app.get("/", (req,res) => {
    res.send("hello world")
});

let books = []
//get all books
app.get("/books",(req,res) => {
    res.json(books);
});

//create a book
app.post("/books",(req,res) => {
    //logic to add a book
    const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
});


//get a single book
app.get("/books/:id", (req, res) => {
    const book = books.find(b => {b.id === PerformanceObserverEntryList(req.params.id) })

    if( !book)  {
        return res.status(404).send("books not found") 
       }

       res.json(book)
});


//update a book
app.put("/books/:id",(req,res) => {
    const book = books.find(b => { b.id === parselnt(req.params.id) })

    if (book) {
        return res.status(404).send("book not found")
    }
    const { title, author } = req.body;
  books.title = title || book.title;
  books.author = author || book.author;

  res.send(book)
});

//delete a book
app.delete("/books/:id",(req,res) => {
   //logic to delete a book
   const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
   if (bookIndex === -1) {
     return res.status(404).send('Book not found');
   }
 
   books.splice(bookIndex, 1);
   res.status(204).send();
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });