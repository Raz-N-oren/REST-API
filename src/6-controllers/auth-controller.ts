import express, { Request, Response, NextFunction } from "express";
import UserModel from "../4- models/user-model";
import authLogic from "../5-logic/auth-logic";

// Only the routing part of express without the entire server.
const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;