import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import RoleModel from "../4- models/role-model";
import UserModel from "../4- models/user-model";

async function register(user: UserModel): Promise<string> {

    // Validation...

    // Get all users (only now, when working with DB we won't get all users):
    const users = await dal.getAllUsers();

    // Is username taken:

    // Find next id:
    user.id = users[users.length - 1].id + 1;

    // Define new user as a User role:
    user.role = RoleModel.User;

    // Add new user to collection:
    users.push(user);

    // Save users back to file:
    await dal.saveAllUsers(users);

    // Generate token:
    const token = cyber.getNewToken(user);

    // Return the generated token:
    return token;

}

export default {
    register
}