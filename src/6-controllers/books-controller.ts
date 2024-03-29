import express, { Request, Response, NextFunction } from "express";
import path from "path";
import deleteMessage from "../3-middleware/delete-message";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import BookModel from "../4-models/book-model";
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
router.post("/books", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        const book = new BookModel(request.body);
        const addedBook = await booksLogic.addBook(book);
        response.status(201).json(addedBook);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// PUT  http://localhost:3001/api/books/:id
router.put("/books/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;

        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        const book = new BookModel(request.body);
        const updatedBook = await booksLogic.updateBook(book);
        response.json(updatedBook);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// DELETE  http://localhost:3001/api/books/:id
router.delete("/books/:id([0-9]+)", [verifyAdmin, deleteMessage], async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await booksLogic.deleteBook(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

// GET  http://localhost:3001/api/books/images/:imageName
router.get("/books/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;

        // __dirname contains the full path to our current folder - controllers folder.
        const absolutePath = path.join(__dirname,"..","1-assets","images",imageName);
        response.sendFile(absolutePath);
    } catch (err: any) {
        next(err); // Catch-all Middleware
    }
});

export default router;