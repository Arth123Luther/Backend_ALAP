const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', (req, res) => {
  try {
    const { usuario, senha } = req.body;
    
    if (usuario === 'email@exemplo.com' && senha === 'abcd1234') {
      const token = gerarToken({ email: usuario });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ msg: 'Usuário ou senha inválidos' });
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Erro no servidor' });
  }
});

router.post('/renovar', verificarToken, (req, res) => {
  try {
    const token = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ msg: 'Erro ao renovar token' });
  }
});

module.exports = router;