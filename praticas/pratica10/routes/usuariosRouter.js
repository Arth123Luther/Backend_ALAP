const express = require('express');
const { criar, entrar, renovar, remover } = require('../controllers/usuariosController');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', criar);
router.post('/login', entrar);
router.post('/renovar', verificarToken, renovar);
router.delete('/:id', verificarToken, remover);

module.exports = router;