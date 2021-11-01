// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {
res.render('books/details', {title: 'Add Book', books:books});
    /*****************
     * ADD CODE HERE (Updated: Get process created for add page)*
     *****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {
  let newBook = book({
    "title": req.body.title,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
});

book.create(newBook, (err, book)=> {

    if(err){
        console.log(err);
        res.end(err);
    }
    else{
        //refresh the book list
        res.redirect('/books');
    }
});

    /*****************
     * ADD CODE HERE (Updated: Post process created for add page)*
     *****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {
  
  let id = req.params.id; 

  book.findById(id, (err, bookToEdit) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          //show the edit view
          res.render('books/details', {title: 'Edit Book Info', books: bookToEdit})
      }
  });
    /*****************
     * ADD CODE HERE (Updated: Get process created for edit page)*
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  let id = req.params.id

  let updateBookInfo = book({
      "_id": id,
      "title": req.body.Title,
      "price": req.body.Price,
      "author": req.body.Author,
      "genre": req.body.Genre
      });

  book.updateOne({_id: id}, updateBookInfo, (err) => {

      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else{
          // refresh the book list
          res.redirect('/books');
      }
    /*****************
     * ADD CODE HERE (Updated: Post process created for edit page)*
     *****************/
});
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id; 

  book.remove({_id: id}, (err) => {
      if(err){
          console.log(err);
          res.end(err);
      }
      else{
          // refresh the book list
          res.redirect('/books');
      }
  });
});
    /*****************
     * ADD CODE HERE (Updated: Process created for deletion of entries)*
     *****************/



module.exports = router;
