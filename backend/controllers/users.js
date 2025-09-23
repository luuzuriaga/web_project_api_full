const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { NODE_ENV, JWT_SECRET } = process.env;

// En desarrollo usar una clave por defecto, en producción usar variable de entorno
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'desarrollo-secreto-super-seguro';

// Crear usuario (registro)
const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await User.create({
      name,
      about,
      avatar,
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

    // Buscar usuario por email incluyendo contraseña
    const user = await User.findUserByCredentials(email, password);

    if (!user) {
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      throw error;
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('Email o contraseña incorrectos');
      error.statusCode = 401;
      throw error;
    }

    // Crear JWT token que expira en una semana
    const token = jwt.sign(
      { _id: user._id },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({ 
      token,
      message: 'Login exitoso' 
    });
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
      throw error;
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
      throw error;
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
      throw error;
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