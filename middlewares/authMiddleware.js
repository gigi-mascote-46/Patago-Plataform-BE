const jwt = require('jsonwebtoken');

// Middleware de autenticação via token JWT
module.exports = function (req, res, next) {
  // Tentar obter o token a partir do cabeçalho personalizado ou padrão "Authorization"
  const token =
    req.header('x-auth-token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ msg: 'Sem token, acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados decodificados (ex: id) ao request
    next();
  } catch (error) {
    const isExpired = error.name === 'TokenExpiredError';
    const isMalformed = error.name === 'JsonWebTokenError';
    return res.status(401).json({
      msg: isExpired
        ? 'Token expirado, faz login novamente'
        : isMalformed
        ? 'Token inválido'
        : 'Erro de autenticação',
    });
  }
};
