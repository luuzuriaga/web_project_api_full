
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config(); // ← AÑADIDO

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
const { PORT = 3001, NODE_ENV } = process.env;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aroundb';

// Configurar conexión a MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch((err) => {
  console.error('❌ Error conectando a MongoDB:', err);
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
});

// Middlewares
app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));

// Logger de requests
app.use(requestLogger);

// ⚠️ CRASH TEST (eliminar después de testing)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// Rutas públicas (sin autenticación)
app.post('/signup', validateUserRegistration, createUser);
app.post('/signin', validateUserLogin, login);

// Middleware de autorización para rutas protegidas
app.use(auth);

// Rutas protegidas
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores de celebrate
app.use(errors());

// Middleware de manejo centralizado de errores (¡DEBE IR AL FINAL!)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📝 Modo: ${NODE_ENV || 'desarrollo'}`);
});