/*
 * This router handles routes to localhost:3000/deck
 */

const express = require('express');
const deckController = require('../controllers/deckControllers');

const deckRouter = express.Router();

// directs get requests made to the root endpoint of /deck to the deckController
deckRouter.get('/:deckId', deckController.readDeckOfCards, (req, res) => {
  res.status(200).json(res.locals.data);
});


// directs delete request for the selected cardId
deckRouter.delete('/delete/:cardId', deckController.deleteCard, (req, res) => {
  res.status(200).json(res.locals.count);
})

module.exports = deckRouter;
