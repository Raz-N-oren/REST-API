import dal from "../2-utils/dal";
import BookModel from "../4- models/book-model";

// Get all books
async function getAllBooks(): Promise<BookModel[]> {

    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    //Return all books:
    return books;
}

// Get one book:
async function getOneBook(id: number): Promise<BookModel> {
    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    //Find desired book:
    const book = books.find(b => b.id === id);

    // Return found book:
    return book;
}

// Add new book
async function addBook(book: BookModel): Promise<BookModel> {
    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    // Generate new id:
    book.id = books.length === 0 ? 1 : books[books.length - 1].id + 1;

    // Add book to array:
    books.push(book);

    // Save back all books to JSON file:
    await dal.saveAllBooks(books);
    return book;
}

// Update existing book:
async function updateBook(book: BookModel): Promise<BookModel> {
    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    // Find desired book:
    const index = books.findIndex(b => b.id === book.id);

    // Update found book:
    books[index] = book;

    // Save back all books to JSON file:
    await dal.saveAllBooks(books);

    // Return updated book:
    return book;
}

export default {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook
};