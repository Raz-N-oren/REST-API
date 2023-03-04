import express, { Request, Response, NextFunction } from "express";
import booksLogic from "../5-logic/books-logic";

// Only the routing part of express without the entire server.
const router = express.Router();

// Routes...
router.get("/api/books", async (request: Request, response: Response, next: NextFunction) => {
    const books = await booksLogic.getAllBooks();
    response.json(books);
});


export default router;