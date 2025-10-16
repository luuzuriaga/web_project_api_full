// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// En desarrollo usar una clave por defecto, en producción usar variable de entorno
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'desarrollo-secreto-super-seguro';

const auth = (req, res, next) => {
  // Obtener el token del header Authorization
  const { authorization } = req.headers;

  console.log('🔐 Auth middleware - Headers recibidos:', {
    authorization: authorization ? `${authorization.substring(0, 20)}...` : 'NO PRESENTE',
    allHeaders: Object.keys(req.headers)
  });

  // Verificar que el header existe y tiene el formato Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.error('❌ Auth middleware - Token no presente o formato incorrecto');
    return res.status(401).json({ 
      message: 'Token de autorización requerido',
      receivedAuth: authorization ? 'present but wrong format' : 'not present'
    });
  }

  // Extraer el token (remover 'Bearer ')
  const token = authorization.replace('Bearer ', '');
  console.log('🔑 Token extraído (primeros 20 chars):', token.substring(0, 20));
  console.log('📏 Longitud del token:', token.length);
  
  let payload;

  try {
    // Verificar el token
    payload = jwt.verify(token, jwtSecret);
    console.log('✅ Token verificado correctamente:', payload);
  } catch (err) {
    console.error('❌ Error verificando token:', err.message);
    console.error('📋 Detalles del error:', {
      name: err.name,
      message: err.message,
      expiredAt: err.expiredAt
    });
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expirado',
        expiredAt: err.expiredAt
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Token inválido',
        error: err.message
      });
    }
    
    return res.status(401).json({ 
      message: 'Error al verificar el token',
      error: err.message
    });
  }

  // Añadir el payload al objeto req para uso en controladores
  req.user = payload;
  console.log('👤 Usuario autenticado:', req.user._id);
  
  return next();
};

module.exports = auth;