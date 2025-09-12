const express = require("express");

const tarefas = [  
    { id: 1, nome: "Estudar middleware", concluida: false },  
    { id: 2, nome: "Praticar Express", concluida: true }  
];

const app = express();

app.use(express.json());

const data = new Date();
const formatador = new Intl.DateTimeFormat({
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

app.use((req, res, next) => {
    console.log("Data:", formatador.format(data));
    console.log("Método HTTP:", req.method);
    console.log("URL Acessado:", req.url);
    next();
});

const router = express.Router();
app.use('/tarefas', router);

router.get('/', (req, res) => {
    res.json(tarefas);
});

router.post('/', (req, res) => {
    const novaTarefa = { id: tarefas.length + 1, ... req.body};
    tarefas.push(novaTarefa);
    res.status(201).send(novaTarefa);
});

router.get('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const tarefaEncontrada = tarefas.find(item => item.id == tarefaId);
    if (tarefaEncontrada) return res.send(tarefaEncontrada);
    throw Error;
});

router.put('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const { nome, concluida } = req.body;
    const tarefaEncontrada = tarefas.find(item => item.id == tarefaId);
    if (tarefaEncontrada)
        {tarefaEncontrada.nome = nome; tarefaEncontrada.concluida = concluida;
        return res.send(tarefaEncontrada)};
    throw Error;
});

router.delete('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const posicao = tarefas.findIndex(item => item.id == tarefaId);
    if (posicao >= 0) {
        tarefas.splice(posicao,1); 
        return res.status(204).end()
    };
    throw Error;
});

app.use((err, req, res, next) => {
    err.message = 'Tarefa não localizada!';
    res.status(400).send(err.message);
});

app.listen(3000, () => {
    console.log("App está funcionando.");
});

module.export = app;