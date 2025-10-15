
// backend/middlewares/requestLogger.js
const winston = require('winston');
const expressWinston = require('express-winston');

// Configuración del logger para requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ 
      filename: 'request.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { 
    return false; 
  }
});

module.exports = requestLogger;