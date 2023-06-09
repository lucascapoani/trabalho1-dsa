const express = require('express');
// Instanciando o framework Express na variável app
const app = express();
// Instanciando os dados dos livros
const data = require('./data.json');

// Método para o Express utilizar/ler JSON
app.use(express.json());

let id = 4;

// Utilizando verbos HTTP como uma boa prática.

// Buscando a lista de todos os livros
// http://localhost:3000/books
app.get("/books", function(req, res) {
    // Callback function chama o response em JSON através do método json com o parâmetro data (dados dos livros).
    res.json(data);
});


// Buscando livro por Id
app.get("/books/:id", function(req, res) {
    // Busca o ID nos parâmetros da requisição
    const { id } = req.params;
    // Procurar o livro de Id que for igual ao Id que estou solicitando e depois coloco na variável book.
    const book = data.find(book => book.id == id);
    // Utilizei 404 "Not Found", caso o livro não exista ou não seja encontrado.
    if (!book) return res.status(404).json();

    res.json(book);
});

// Adicionando um livro ao sistema
app.post("/books", function(req , res){
    const { name, isbn, author, editor, year } = req.body;
    // Método push vai adicionar os parâmetros preenchidos na lista.
    data.push({ name, isbn, author, editor, year, id })
    
    res.json({ name, isbn, author, editor, year, id });

    id++;
});

// Atualizar livro
app.put("/books/:id", function(req, res){
    const { id } = req.params;
    const book = data.find(book => book.id == id);
    // Caso não encontre o livro pelo id, lança um erro 404 not found.
    if (!book) return res.status(404).json();
    // Atualiza os parâmetros dos livros. Nesse caso é necessário atualizar todos parâmetros ou pelo menos preenche-los.
    const { name, isbn, author, editor, year } = req.body;

    book.name = name;
    book.isbn = isbn;
    book.author = author;
    book.editor = editor;
    book.year = year;

    res.json(book);
});

// Deletar livro
app.delete("/books/:id", function(req, res){    
    const { id } = req.params;
    const book = data.find(book => book.id == id);
    
    // Caso não encontre o livro pelo id, lança um erro 404 not found. Se encontrar, utiliza o método splice 
    // para retirar o livro da lista de livros.
    if (!book) {
        return res.status(404).json()
    } else {
        data.splice(id-1, 1);
        res.json(book);
    }
});

// Método listen vai "lançar" o servidor . Porta 3000
app.listen(3000, function(){
    console.log('Servidor iniciando...')
});
