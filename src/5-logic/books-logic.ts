import dal from "../2-utils/dal";
import BookModel from "../4-models/book-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";

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

    // If not found:
    if (!book) {
        throw new ResourceNotFoundErrorModel(id);
    }

    // Return found book:
    return book;
}

// Add new book
async function addBook(book: BookModel): Promise<BookModel> {

    // Validation
    const errors = book.validate();
    if (errors) {
        throw new ValidationErrorModel(errors);
    }

    // Save image to disk if exists:
    if(book.image){
        book.imageName = book.image.name;
        await book.image.mv("./src/1-assets/images/" + book.imageName);
        delete book.image;
    }

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

    // Validation
    const errors = book.validate();
    if (errors) {
        throw new ValidationErrorModel(errors);
    }

    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    // Find desired book:
    const index = books.findIndex(b => b.id === book.id); // -1 if not found

    // If not found:
    if (index === -1) {
        throw new ResourceNotFoundErrorModel(book.id);
    }

    // Update found book:
    books[index] = book;

    // Save back all books to JSON file:
    await dal.saveAllBooks(books);

    // Return updated book:
    return book;
}

// DELETE one book:
async function deleteBook(id: number): Promise<void> {

    // Get all books from JSON file:
    const books = await dal.getAllBooks();

    //Find desired book:
    const index = books.findIndex(b => b.id === id);

    // If not found:
    if (index === -1) {
        throw new ResourceNotFoundErrorModel(id);
    }

    //Delete desired book from array:
    books.splice(index, 1);

    // Save back all books to JSON file:
    await dal.saveAllBooks(books);
}

export default {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
};