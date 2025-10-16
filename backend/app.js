// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();

// Importar middlewares
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

// Importar rutas
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

// Importar controladores para login y registro
const { createUser, login } = require('./controllers/users');
const { 
  validateUserRegistration, 
  validateUserLogin 
} = require('./middlewares/validation');

const app = express();
const { PORT = 3001, NODE_ENV, MONGODB_URI } = process.env;

// Configurar conexión a MongoDB
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB');
  console.log('📊 Base de datos:', MONGODB_URI ? 'Atlas' : 'Local');
}).catch((err) => {
  console.error('❌ Error conectando a MongoDB:', err);
  process.exit(1);
});

// CORS configurado correctamente
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://lucero.baselinux.net:3000',
      'http://www.lucero.baselinux.net:3000'
    ];
    
    // Permitir requests sin origin (como Postman) en desarrollo
    if (!origin && NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Rate limiting (más permisivo en desarrollo)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: NODE_ENV === 'production' ? 100 : 1000, // 1000 en desarrollo, 100 en producción
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
  skip: (req) => NODE_ENV !== 'production' // Desactivar en desarrollo
});

// Middlewares
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Logger de requests
app.use(requestLogger);

// Health check (útil para monitoreo)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV || 'development'
  });
});

// ⚠️ CRASH TEST (SOLO EN DESARROLLO - eliminar en producción)
if (NODE_ENV !== 'production') {
  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('El servidor va a caer (crash test)');
    }, 0);
  });
}

// Rutas públicas (sin autenticación)
app.post('/signup', validateUserRegistration, createUser);
app.post('/signin', validateUserLogin, login);

// Middleware de autorización para rutas protegidas
app.use(auth);

// Rutas protegidas
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// Ruta 404 para rutas no encontradas
app.use('*', (req, res) => {
  console.log('⚠️ Ruta no encontrada:', req.method, req.originalUrl);
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl 
  });
});

// Manejo de errores de celebrate (validación)
app.use(errors());

// Middleware de manejo centralizado de errores (¡DEBE IR AL FINAL!)
app.use(errorHandler);

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📝 Modo: ${NODE_ENV || 'desarrollo'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('='.repeat(50));
});

module.exports = app;