class BookModel {
    public id: number;
    public name: string;
    public price: number;

    public constructor(book: BookModel) { // Copy constructor
        this.id = book.id;
        this.name = book.name;
        this.price = book.price;
    }
}

export default BookModel;