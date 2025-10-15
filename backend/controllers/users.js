// backend/controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'desarrollo-secreto-super-seguro';

// Crear usuario (registro)
const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
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
    next(error);
  }
};

// Login de usuario
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email e incluir contraseña
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      return next(error);
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      return next(error);
    }

    // Crear JWT token que expira en una semana
    const token = jwt.sign(
      { _id: user._id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Obtener información del usuario actual
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

// Actualizar perfil de usuario
const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

// Actualizar avatar de usuario
const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }

    res.json({ data: user });
  } catch (error) {
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