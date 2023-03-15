import RoleModel from "./role-model";
import Joi from 'joi';

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    public static validationScheme = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        userName: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(4).max(20),
        role: Joi.forbidden() // check later
    });

    public validate(): string {
        const result = UserModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default UserModel;