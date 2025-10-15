
// backend/middlewares/errorHandler.js
const winston = require('winston');

// Logger para errores
const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    new winston.transports.Console()
  ]
});

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log del error
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Determinar el código de estado y mensaje
  let statusCode = 500;
  let message = 'Error interno del servidor';

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Datos inválidos proporcionados';
  }

  // Error de clave duplicada (email ya existe)
  if (err.code === 11000) {
    statusCode = 409;
    message = 'El email ya está registrado';
  }

  // Error de casting (ObjectId inválido)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID inválido proporcionado';
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token de autorización inválido';
  }

  // Error de JWT expirado
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token de autorización expirado';
  }

  // Errores personalizados con statusCode
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : message
  });
};

module.exports = errorHandler;