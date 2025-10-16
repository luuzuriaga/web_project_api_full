// backend/controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'desarrollo-secreto-super-seguro';

console.log('🔧 JWT Secret configurado:', jwtSecret ? 'Sí' : 'No');
console.log('🌍 Entorno:', NODE_ENV || 'development');

// Crear usuario (registro)
const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    console.log('📝 Intentando registrar usuario:', email);

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Email ya existe:', email);
      const error = new Error('El email ya está registrado');
      error.statusCode = 409;
      return next(error);
    }

    // Hash de la contraseña (saltos = 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario con valores por defecto si no se proporcionan
    const user = await User.create({
      name: name || 'Jacques Cousteau',
      about: about || 'Explorador',
      avatar: avatar || 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      email,
      password: hashedPassword
    });

    console.log('✅ Usuario creado:', user._id);

    // Devolver usuario sin contraseña
    const userResponse = {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    };

    res.status(201).json({ data: userResponse });
  } catch (error) {
    console.error('❌ Error en createUser:', error);
    next(error);
  }
};

// Login de usuario
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Intento de login:', email);

    // Buscar usuario por email e incluir contraseña
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ Usuario no encontrado:', email);
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      return next(error);
    }

    console.log('👤 Usuario encontrado:', user._id);

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('❌ Contraseña incorrecta para:', email);
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      return next(error);
    }

    console.log('✅ Contraseña correcta');

    // Crear JWT token que expira en una semana
    const token = jwt.sign(
      { _id: user._id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    console.log('🎫 Token generado (primeros 20 chars):', token.substring(0, 20));
    console.log('📏 Longitud del token:', token.length);
    console.log('🔑 Secret usado:', jwtSecret.substring(0, 10) + '...');

    // Verificar que el token se pueda decodificar
    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log('✅ Token verificado correctamente:', decoded);
    } catch (verifyError) {
      console.error('❌ Error verificando token recién creado:', verifyError);
    }

    res.status(201).json({ token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    next(error);
  }
};

// Obtener información del usuario actual
const getCurrentUser = async (req, res, next) => {
  try {
    console.log('📡 getCurrentUser - ID del usuario:', req.user._id);
    
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log('❌ Usuario no encontrado:', req.user._id);
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    console.log('✅ Usuario encontrado:', {
      _id: user._id,
      email: user.email,
      name: user.name
    });

    res.json({ data: user });
  } catch (error) {
    console.error('❌ Error en getCurrentUser:', error);
    next(error);
  }
};

// Actualizar perfil de usuario
const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    console.log('📝 Actualizando usuario:', req.user._id, { name, about });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      console.log('❌ Usuario no encontrado para actualizar:', req.user._id);
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    console.log('✅ Usuario actualizado:', user._id);

    res.json({ data: user });
  } catch (error) {
    console.error('❌ Error en updateUser:', error);
    next(error);
  }
};

// Actualizar avatar de usuario
const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    console.log('📝 Actualizando avatar:', req.user._id);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      console.log('❌ Usuario no encontrado para actualizar avatar:', req.user._id);
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    console.log('✅ Avatar actualizado:', user._id);

    res.json({ data: user });
  } catch (error) {
    console.error('❌ Error en updateAvatar:', error);
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
  updateAvatar
};