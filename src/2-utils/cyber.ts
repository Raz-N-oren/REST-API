import { Request } from 'express';
import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from '../4-models/role-model';

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
    return new Promise<boolean>((resolve, reject) => { // To Promisify

        try {
            // Token format inside a header named authorization:
            // "Bearer the-token"
            //  01234567

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

async function verifyAdmin(request: Request): Promise<boolean> {

    // First check if user logged in:
    const isLoggedIn = await verifyToken(request);

    // If not logged in:
    if (!isLoggedIn) {
        return false;
    }

    // Extract header:
    const header = request.header("authorization");

    // Extract token from header:
    const token = header.substring(7);

    // Extract container from token:
    const container: any = jwt.decode(token);

    // Extract user:
    const user = container.user;

    // Return true if user is admin, otherwise return false:
    return user.role === RoleModel.Admin
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
};