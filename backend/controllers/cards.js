const Card = require('../models/Card');

// Obtener todas las tarjetas
const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .populate('owner', 'name avatar')
      .populate('likes', 'name')
      .sort({ createdAt: -1 });

    res.json(cards);
  } catch (error) {
    next(error);
  }
};

// Crear nueva tarjeta
const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id
    });

    // Poblar los datos del owner para la respuesta
    const populatedCard = await Card.findById(card._id)
      .populate('owner', 'name avatar')
      .populate('likes', 'name');

    res.status(201).json({ data: populatedCard });
  } catch (error) {
    next(error);
  }
};

// Eliminar tarjeta
const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId);

    if (!card) {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    }

    // Verificar que el usuario es el propietario de la tarjeta
    if (card.owner.toString() !== req.user._id) {
      const error = new Error('No tienes permisos para eliminar esta tarjeta');
      error.statusCode = 403;
      throw error;
    }

    await Card.findByIdAndDelete(cardId);

    res.json({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

// Dar like a una tarjeta
const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } }, // $addToSet solo añade si no existe
      { new: true }
    )
    .populate('owner', 'name avatar')
    .populate('likes', 'name');

    if (!card) {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json({ data: card });
  } catch (error) {
    next(error);
  }
};

// Quitar like de una tarjeta
const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // $pull remueve el elemento del array
      { new: true }
    )
    .populate('owner', 'name avatar')
    .populate('likes', 'name');

    if (!card) {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json({ data: card });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};