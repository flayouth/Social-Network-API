const express = require('express');
const router = express.Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.get('/', getAllThoughts);

router.get('/:thoughtId', getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.post('/:userId', createThought);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
