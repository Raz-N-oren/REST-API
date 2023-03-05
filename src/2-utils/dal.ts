import fsPromises from "fs/promises";
import BookModel from "../4- models/book-model";

const filePath = "./src/1-assets/json/books.json";

async function getAllBooks(): Promise<BookModel[]> {
    const content = await fsPromises.readFile(filePath, "utf-8");
    const books = JSON.parse(content);
    return books;
}

async function saveAllBooks(books: BookModel[]): Promise<void> {
    const content = JSON.stringify(books,null,4); // 4 = Number of spaces of each tab
    await fsPromises.writeFile(filePath, content);
}

export default {
    getAllBooks,
    saveAllBooks
}