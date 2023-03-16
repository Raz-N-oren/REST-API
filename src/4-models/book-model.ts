import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';

class BookModel {

    public id: number;
    public name: string;
    public price: number;
    public image: UploadedFile; // The file uploaded by the frontend.
    public imageName: string;

    public constructor(book: BookModel) { // Copy constructor
        this.id = book.id;
        this.name = book.name;
        this.price = book.price;
        this.image = book.image;
        this.imageName = book.imageName;
    }

    // Creating a validation Schema object once for any BookModel:
    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        name: Joi.string().required().min(2).max(100),
        price: Joi.number().required().positive().min(0).max(1000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    });

    // Validate current object (return undefined if no error, or message if there is an error):
    public validate(): string | undefined {
        const result = BookModel.validationSchema.validate(this, { abortEarly: false });
        return result.error?.message; // undefined if there are no errors
    }
}

export default BookModel;