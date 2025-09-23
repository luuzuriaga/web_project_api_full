const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 200
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: function(v) {
        return validator.isURL(v);
      },
      message: 'URL de avatar inválida'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'Email inválido'
    }
  },
  password: {
    type: String,
    required: true,
    select: false, // No devolver por defecto en las consultas
    minlength: 8
  }
}, {
  timestamps: true,
  versionKey: false
});

// Método para encontrar usuario por email incluyendo contraseña
userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password');
};

module.exports = mongoose.model('User', userSchema);