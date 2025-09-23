const router = require('express').Router();
const {
  getCurrentUser,
  updateUser,
  updateAvatar
} = require('../controllers/users');

const {
  validateUserUpdate,
  validateAvatarUpdate
} = require('../middlewares/validation');

// GET /users/me - obtener información del usuario actual
router.get('/me', getCurrentUser);

// PATCH /users/me - actualizar perfil del usuario
router.patch('/me', validateUserUpdate, updateUser);

// PATCH /users/me/avatar - actualizar avatar del usuario
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;