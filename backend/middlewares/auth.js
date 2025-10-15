
// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// En desarrollo usar una clave por defecto, en producción usar variable de entorno
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'desarrollo-secreto-super-seguro';

const auth = (req, res, next) => {
  // Obtener el token del header Authorization
  const { authorization } = req.headers;

  // Verificar que el header existe y tiene el formato Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Token de autorización requerido' 
    });
  }

  // Extraer el token (remover 'Bearer ')
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Verificar el token
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    console.error('Error verificando token:', err.message);
    return res.status(401).json({ 
      message: 'Token de autorización inválido' 
    });
  }

  // Añadir el payload al objeto req para uso en controladores
  req.user = payload;
  
  return next();
};

module.exports = auth;