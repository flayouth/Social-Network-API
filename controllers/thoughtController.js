const { Thought, User } = require('../models');

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // get one thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // createThought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // update thought by id
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } }
      );
      res.json(deletedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // add reaction
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // delete reaction
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
