import express, { Request, Response, NextFunction } from "express";
import BookModel from "../4- models/book-model";
import booksLogic from "../5-logic/books-logic";

// Only the routing part of express without the entire server.
const router = express.Router();

// GET http://localhost:3001/api/books
router.get("/books", async (request: Request, response: Response, next: NextFunction) => {
    const books = await booksLogic.getAllBooks();
    response.json(books);
});

// GET  http://localhost:3001/api/books/:id
router.get("/books/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    const book = await booksLogic.getOneBook(id);
    response.json(book);
});

// POST  http://localhost:3001/api/books
router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    const book = new BookModel(request.body);
    const addedBook = await booksLogic.addBook(book);
    response.status(201).json(addedBook);
});

// PUT  http://localhost:3001/api/books/:id
router.put("/books/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    request.body.id = id;
    const book = new BookModel(request.body);
    const updatedBook = await booksLogic.updateBook(book);
    response.json(updatedBook);
});

// DELETE  http://localhost:3001/api/books/:id
router.delete("/books/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;
    await booksLogic.deleteBook(id);
    response.sendStatus(204);
});

export default router;