import express from 'express';
import logRequest from './3-middleware/log-request';
import shabbatForbidden from './3-middleware/shabbat-forbidden';
import booksController from './6-controllers/books-controller';

//Create express server:
const server = express();

// Tell express to take the JSON resides in request's body into request.body object:
server.use(express.json());

// Binding our middleware:
server.use(logRequest);
server.use(shabbatForbidden);


// Tell the server to listen to any router written in our controller:
server.use("/api", booksController);

// Run the server:
server.listen(3001, () => console.log("Listening on http://localhost:3001"));

// 01:30:00 MiddleWare && Error handling