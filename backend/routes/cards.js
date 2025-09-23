const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

const {
  validateCardCreation,
  validateObjectIdParam
} = require('../middlewares/validation');

// GET /cards - obtener todas las tarjetas
router.get('/', getCards);

// POST /cards - crear nueva tarjeta
router.post('/', validateCardCreation, createCard);

// DELETE /cards/:cardId - eliminar tarjeta
router.delete('/:cardId', validateObjectIdParam, deleteCard);

// PUT /cards/:cardId/likes - dar like a tarjeta
router.put('/:cardId/likes', validateObjectIdParam, likeCard);

// DELETE /cards/:cardId/likes - quitar like de tarjeta
router.delete('/:cardId/likes', validateObjectIdParam, dislikeCard);

module.exports = router;