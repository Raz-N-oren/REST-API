import UserModel from "../4- models/user-model";
import jwt from "jsonwebtoken";

function getNewToken(user: UserModel): string {

    // Create a container for the user object:
    const container = { user };

    // Create secret key = a string for our REST API:
    const secretKey = "LFCSupporter";

    // Create expiration time:
    const options = { expiresIn: "3h" }

    // Generate token:
    const token = jwt.sign(container, secretKey, options);

    // Return the generated token:
    return token;
}

export default {
    getNewToken
};