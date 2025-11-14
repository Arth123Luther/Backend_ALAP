const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

router.post('/', produtosController.criar);
router.get('/', produtosController.listar);
router.get('/:id', produtosController.buscar, produtosController.exibir);
router.put('/:id', produtosController.buscar, produtosController.atualizar);
router.delete('/:id', produtosController.buscar, produtosController.remover);

module.exports = router;