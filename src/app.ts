import express from 'express';
import booksController from './6-controllers/books-controller';

//Create express server:
const server = express();

// Tell express to take the JSON resides in request's body into request.body object:
server.use(express.json());

// Tell the server to listen to any router written in our controller:
server.use("/",booksController)

// Run the server:
server.listen(3001, () => console.log("Listening on http://localhost:3001"));

//02:41:00