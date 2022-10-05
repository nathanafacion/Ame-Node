import express from 'express'
import { Request, Response } from 'express';

const {randomUUID} = require('crypto');
const { check, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

interface IBook {
    id: string,
    title?: string;
    author?:string,
    year?: number,
    price?: number,
    stock?: number,
  }

interface Dictionary {
    [key: string]: string;
}

const books: Array<IBook> = [];


app.post('/books',
[
    check('title').not().isEmpty(),
    check('author').not().isEmpty(),
    check('year').isNumeric().not().isEmpty(),
    check('price').isNumeric().not().isEmpty(),
    check('stock').isNumeric().not().isEmpty(),
],
(request: Request, response: Response) => { 

    const error = validationResult(request);

    if (!error.isEmpty()) {
        return response.status(400).json({ error: error.array() });
    } 

    const {title, author, year, price, stock} = request.body;

    const newProduct:IBook = {
        id: randomUUID(),
        title, 
        author, 
        year, 
        price,
        stock,
    }

    books.push(newProduct);
    return response.json(newProduct);
});


app.get("/books", (request: Request, response: Response) => {
    return response.json(books);
});

app.get("/books/:id",(request: Request, response: Response) => {
    const {id} = request.params;
    const book :IBook | undefined = books.find(book => book.id === id);

    if (!book) {
        return response.status(400).json({ error: "id não encontrado!" });
    } 

    return response.json(book);
});

app.get("/booksSummary",(request: Request, response: Response) => {
    const newBooks : Dictionary[] = books.map(book => ({
       [book.id]: `${book.title}, ${book.author}, ${book.year} - R$ ${book.price} / ${book.stock} books.`})); 

    return response.json(newBooks);
});

app.get("/booksTotalStock", ( request: Request, response: Response) => {
    const totalStock : number = books.reduce(( acc, book ) => ( acc + (book?.stock || 0) ), 0); 

    return response.json({ "Total" : totalStock });
});

app.put("/books/:id", (request: Request, response: Response) => {
    const {id} = request.params;
    const updateBook : IBook  = request.body;
    const bookIndex: number = books.findIndex( book => book.id === id );

    if (bookIndex === -1) {
        return response.status(400).json({ error: "id não encontrado!" });
    } 

    books[bookIndex] = {
        id: books[bookIndex].id,
        title: updateBook?.title || books[bookIndex].title,
        author: updateBook?.author || books[bookIndex].author,
        price: updateBook?.price || books[bookIndex].price,
        year: updateBook?.year || books[bookIndex].year,
        stock: updateBook?.stock || books[bookIndex].stock,
    }

    return response.json({ message: "Produto alterado com sucesso" });
})

app.delete("/books/:id", ( request: Request, response: Response) => {
    const {id} = request.params;
    const bookIndex: number = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return response.status(400).json({ error: "id não encontrado!" });
    } 

    books.splice(bookIndex, 1);

    return response.json({ message: "Produto removido com sucesso" });
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));