import { UnauthorizedErrorModel } from './../4-models/error-models';
import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {
        const isValid = await cyber.verifyToken(request);
        if (!isValid) {
            throw new UnauthorizedErrorModel("Invalid token.");
        }
        next();
    }
    catch (err: any) {
        next(err);
    }
}

export default verifyLoggedIn;