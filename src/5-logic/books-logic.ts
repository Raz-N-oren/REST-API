import dal from "../2-utils/dal";
import BookModel from "../4- models/book-model";

async function getAllBooks(): Promise<BookModel[]> {
    const books = await dal.getAllBooks();
    return books;
}

export default {
    getAllBooks
};