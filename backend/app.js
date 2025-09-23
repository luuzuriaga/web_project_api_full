const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');

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
mongoose.connect(NODE_ENV === 'production' && MONGODB_URI 
  ? MONGODB_URI 
  : 'mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana por IP
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
});

// Middlewares
app.use(helmet());
app.use(limiter);
app.use(cors());
app.options('*', cors()); // habilitar solicitudes OPTIONS para todas las rutas
app.use(express.json({ limit: '10mb' }));

// Logger de requests
app.use(requestLogger);

// Crash test route (solo para desarrollo/testing)
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

// Ruta 404 para endpoints no encontrados
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo centralizado de errores de celebrate
app.use(errors());

// Middleware de manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
  console.log(`Modo: ${NODE_ENV || 'desarrollo'}`);
});