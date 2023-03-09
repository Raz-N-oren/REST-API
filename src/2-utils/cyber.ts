import { Request } from 'express';
import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";

// Create secret key ==> a string for our REST API:
const secretKey = "LFCSupporter";

function getNewToken(user: UserModel): string {

    // Create a container for the user object:
    const container = { user };

    // Create expiration time:
    const options = { expiresIn: "3h" }

    // Generate token:
    const token = jwt.sign(container, secretKey, options);

    // Return the generated token:
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        try {
            // Token format:
            // authorization header --> "Bearer token"

            // Extract header:
            const header = request.header("authorization");

            // If no such header:
            if (!header) {
                resolve(false);
                return;
            }

            // Extract token from header:
            const token = header.substring(7);

            // If there is no token:
            if (!token) {
                resolve(false);
                return;
            }

            // Verify token:
            jwt.verify(token, secretKey, err => {

                // If token is illegal:
                if (err) {
                    reject(false);
                    return;
                }

                // Here token must be legal:
                resolve(true);
            })

        } catch (err: any) {
            reject(err);
        }
    });
}

export default {
    getNewToken,
    verifyToken
};