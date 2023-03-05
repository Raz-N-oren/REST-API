import dal from "../2-utils/dal";
import BookModel from "../4- models/book-model";

// Get all books
async function getAllBooks(): Promise<BookModel[]> {
    const books = await dal.getAllBooks();
    return books;
}

// Get one book:
async function getOneBook(id: number): Promise<BookModel> {
    const books = await dal.getAllBooks();
    const book = books.find(b => b.id === id);
    return book;
}

// Add new book
async function addBook(book: BookModel): Promise<BookModel> {
    const books = await dal.getAllBooks();
    book.id = books.length === 0 ? 1 : books[books.length - 1].id + 1;
    books.push(book);
    await dal.saveAllBooks(books);
    return book;
}

export default {
    getAllBooks,
    getOneBook,
    addBook
};