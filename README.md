## Criação de API para o Ame Fast Forward

- Server.ts : 
		Uso de express e express-validator. 
		Criação de pequena API de livros.
		Uso de manipulação de listas com: map, reduce, find e findIndex.
		Uso de métodos : get, post, put e delete. 

**Mini-documentação**

*Objeto de um livro*
{
    "title": "Mistborn 3",
    "author": "Brandon Sanderson",
    "year": 2017,
    "price": 50,
    "stock": 5
}

*GET /books*  
Traz todos os livros cadastrados

*POST /books*  
Cadastra um novo livro

*GET /books/:id*  
Traz um livro em específico

*PUT /books/:id*  
Altera os dados de um livro

*DELETE /books/:id*  
Delete dados de um livro

*GET /booksTotalStock*  
Informa o total de livros em estoque

*GET /booksSummary*  
Retorna um pequeno resumo com todas informações do livro
