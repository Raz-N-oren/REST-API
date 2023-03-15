import express from 'express';
import catchAll from './3-middleware/catch-all';
import logRequest from './3-middleware/log-request';
import routeNotFound from './3-middleware/route-not-found';
import shabbatForbidden from './3-middleware/shabbat-forbidden';
import booksController from './6-controllers/books-controller';
import authController from './6-controllers/auth-controller';

//Create express server:
const server = express();

// Tell express to take the JSON resides in request's body into request.body object:
server.use(express.json());

// Binding our middleware:
server.use(logRequest);
server.use(shabbatForbidden);

// Tell the server to listen to any router written in our controller:
server.use("/api", booksController);
server.use("/api", authController)

// Route not found middleware
server.use("*", routeNotFound);

// Catch all middleware:
server.use(catchAll);

// Run the server:
server.listen(3001, () => console.log("Listening on http://localhost:3001"));

// 00:40:00 Auth, upload images