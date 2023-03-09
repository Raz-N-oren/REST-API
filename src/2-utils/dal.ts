import fsPromises from "fs/promises";
import BookModel from "../4-models/book-model";
import UserModel from "../4-models/user-model";

const booksFilePath = "./src/1-assets/json/books.json";
const usersFilePath = "./src/1-assets/json/users.json";

async function getAllBooks(): Promise<BookModel[]> {
    const content = await fsPromises.readFile(booksFilePath, "utf-8");
    const books = JSON.parse(content);
    return books;
}

async function saveAllBooks(books: BookModel[]): Promise<void> {
    const content = JSON.stringify(books,null,4); // 4 = Number of spaces of each tab
    await fsPromises.writeFile(booksFilePath, content);
}

async function getAllUsers(): Promise<UserModel[]> {
    const content = await fsPromises.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(content);
    return users;
}

async function saveAllUsers(users: UserModel[]): Promise<void> {
    const content = JSON.stringify(users,null,4); // 4 = Number of spaces of each tab
    await fsPromises.writeFile(usersFilePath, content);
}

export default {
    getAllBooks,
    saveAllBooks,
    getAllUsers,
    saveAllUsers
}