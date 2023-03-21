//userController.js
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(UserData => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // get one user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
        .populate("thoughts")
        .populate("friends")
        .then ((UserData) =>  res.JSON(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // createUser
    createUser(req, res) {
        User.create(req.body)
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate( 
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    },
    // delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(400).json(err));
    }
};