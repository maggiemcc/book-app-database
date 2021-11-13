const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Book = require("../models/Book");

const getAllBooks = async () => {
  const allBooks = await Book.find();
  return allBooks;
};

// Get - get all books
router.get("/", async (req, res) => {
   await getAllBooks()
  .then((result) => {
    res.json(result);
  })
  .catch((error) => console.log(error));
});

// Get - get liked books
router.get("/liked/:liked", async (req, res) => {
  await Book.find({liked: req.params.liked === 'true'})
 .then((result) => {
   res.json(result);
 })
 .catch((error) => console.log(error));
});

// Get - get books read
router.get("/readlist/:read", async (req, res) => {
  await Book.find({hasRead: req.params.read === 'true'})
 .then((result) => {
   res.json(result);
 })
 .catch((error) => console.log(error));
});

// Get - get wishlist books
router.get("/wishlist/:wishlist", async (req, res) => {
  await Book.find({wishlist: req.params.wishlist === 'true'})
 .then((result) => {
   res.json(result);
 })
 .catch((error) => console.log(error));
});

// Get - get by version
router.get("/:version", async (req, res) => {
  await Book.findOne({version: req.params.version})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
});

// POST - add book to read collection
router.post("/readlist", async (req, res) => {
  const newBook = await new Book({
    version: req.body.version,
    title: req.body.title,
    author: req.body.author,
    published: req.body.published,
    wishlist: req.body.wishlist,
    hasRead: req.body.hasRead,
    liked: req.body.liked,
   });

  newBook
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

// PUT
router.put("/:version", async (req, res) => {
   await Book.findOneAndUpdate({ version: req.params.version }, req.body)
    .then(() => {
      Book.findOne({ version: req.params.version }).then((book) => {
        res.send(book);
      });
    })
    .catch((error) => console.error(error));
});

// DELETE - delete book
router.delete("/:version", async (req, res) => {
   await Book.findOneAndDelete({ version: req.params.version })
    .then((book) => {
      res.send(book);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
