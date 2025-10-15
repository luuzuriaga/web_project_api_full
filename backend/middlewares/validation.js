
// backend/middlewares/validation.js
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Función para validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Función para validar ObjectId de MongoDB
const validateObjectId = (value, helpers) => {
  if (!validator.isMongoId(value)) {
    return helpers.error('string.objectId');
  }
  return value;
};

// Validación para registro de usuario
const validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

// Validación para login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  })
});

// Validación para actualizar perfil
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required()
  })
});

// Validación para actualizar avatar
const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL)
  })
});

// Validación para crear tarjeta
const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL)
  })
});

// Validación para parámetros con ObjectId
const validateObjectIdParam = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId)
  })
});

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateAvatarUpdate,
  validateCardCreation,
  validateObjectIdParam
};