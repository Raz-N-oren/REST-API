import express, { Request, Response, NextFunction } from "express";
import deleteMessage from "../3-middleware/delete-message";
import BookModel from "../4- models/book-model";
import booksLogic from "../5-logic/books-logic";

// Only the routing part of express without the entire server.
const router = express.Router();

// GET http://localhost:3001/api/books
router.get("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await booksLogic.getAllBooks();
        response.json(books);
    }
    catch (err: any) {
        next(err); // Catch-all middleware
    }
});

// GET  http://localhost:3001/api/books/:id
router.get("/books/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const book = await booksLogic.getOneBook(id);
        response.json(book);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// POST  http://localhost:3001/api/books
router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const book = new BookModel(request.body);
        const addedBook = await booksLogic.addBook(book);
        response.status(201).json(addedBook);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// PUT  http://localhost:3001/api/books/:id
router.put("/books/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        const book = new BookModel(request.body);
        const updatedBook = await booksLogic.updateBook(book);
        response.json(updatedBook);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// DELETE  http://localhost:3001/api/books/:id
router.delete("/books/:id([0-9]+)", deleteMessage, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await booksLogic.deleteBook(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

export default router;