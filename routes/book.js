const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router.get("/", bookController.getBook);
router.get("/:id", bookController.getBookId);
router.post("/", bookController.addBook);
router.patch("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get('/books/author/:id', bookController.findByAuthor);
router.post('/createBookWithAuthorCheck',bookController.createBookWithAuthorCheck );

module.exports = router;