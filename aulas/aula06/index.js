// 1. Importar Framework
const express = require("express");
// Importar Middleware de terceiros
const cors = require('cors');
// Importar router.js
const router = require('./router');

// 2. Criar Instância da Aplicação
const app = express();

// Middleware de Aplicação
app.use((req, res, next) => {
    console.log("Passei pelo middleware de app");
    next();
})

app.use('/tarefas', router);

// Middleware embutido/integrado
app.use(express.json());
// ?param1=valor1&param2=valor2...
app.use(express.urlencoded({ extended: false }));

// Middleware de terceiros
app.use(cors());

// 3. Criar Middleware de roteamento
app.get('/', (req, res) => {
    res.send("Olá");
});

// Middleware de erro
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// 4. Subir/Executar Aplicação em uma Porta
app.listen(3000, () => {
    console.log("App está On!");
})