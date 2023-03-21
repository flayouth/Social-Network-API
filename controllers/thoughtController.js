//thoughtController.js
const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(ThoughtData => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // get one thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then ((ThoughtData) =>  res.JSON(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // createThought
    createThought(req , res) {
        Thought.create(req.body)
        .then((ThoughtData) => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((ThoughtData) => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((ThoughtData) => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((ThoughtData) => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((ThoughtData) => res.json(ThoughtData))
        .catch((err) => res.status(400).json(err));
    }
};