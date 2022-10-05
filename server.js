const express= require('express');
const {randomUUID} = require('crypto');
const { append } = require('express/lib/response');

const app = express();

app.use(express.json());

const books = [];


app.post('/books', (request, response) => { 
    const {title, author, year, price, stock} = request.body;

    const newProduct = {
        title, 
        author, 
        year, 
        price,
        stock,
        id: randomUUID(),
    }

    books.push(newProduct);
    return response.json(newProduct);
});


app.get("/books", (request, response) => {
    return response.json(books);
});

app.get("/books/:id",(request, response) => {
    const {id} = request.params;
    const book = books.find(book => book.id === id);

    return response.json(book);
});

app.get("/booksSummary",(request, response) => {
    const newBooks = books.map(book => ({
       [book.id]: `${book.title}, ${book.author}, ${book.year} - R$ ${book.price} / ${book.stock} books.`})); 

    return response.json(newBooks);
});

app.get("/booksTotalStock", ( request, response ) => {
    const totalStock = books.reduce(( acc, book ) => ( acc + book.stock ), 0); 

    return response.json({ "Total" : totalStock });
});

app.put("/books/:id", (request, response) => {
    const {id} = request.params;
    const {title, author, year, price} = request.body;
    const bookIndex = books.findIndex( book => book.id === id );

    books[bookIndex] = {
        ...books[bookIndex],
        title,
        author,
        price,
        year,
        stock,
    }

    return response.json({ message: "Produto alterado com sucesso" });
})

app.delete("/books/:id", ( request, response ) => {
    const {id} = request.params;
    const bookIndex = books.findIndex(book => book.id === id);
    books.splice(bookIndex, 1);

    return response.json({ message: "Produto removido com sucesso" });
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));