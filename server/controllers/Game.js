const Game = require('../models/Game.js');

const createGame = async (req,res) => {
    try {
        const {title, platform, genre, status, description} = req.body;

        if(!title || !platform || !genre) {
            return res.status(400).json({
                error: 'Title, platform, and genre are required.',
                id: 'MissingParams',
            });
        }

        const game = new Game({
            title,
            platform,
            genre,
            status,
            description,
            owner: req.session.user._id,
        });

        await game.save();

        return res.status(201).json({
            message: 'Game added successfully',
            game,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong creating game',
        });
    }
};

const getGames = async (req,res) => {
    try {
        const games = await Game.find({
            owner: req.session.user._id,
        }).sort({ createdData: -1 });

        return res.status(200).json({ games });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong when retrieving games',
        });
    }
};

const updateGame = async (req, res) => {
  try {
    const { title, platform, genre, status, description } = req.body;

    if (!title || !platform || !genre) {
      return res.status(400).json({
        error: 'Title, platform, and genre are required.',
      });
    }

    const game = await Game.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.session.user._id,
      },
      {
        title,
        platform,
        genre,
        status,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!game) {
      return res.status(404).json({
        error: 'Game not found.',
      });
    }

    return res.status(200).json({
      message: 'Game updated successfully.',
      game,
    });
  } catch (err) {
    console.error('Error updating game:', err);

    return res.status(500).json({
      error: 'Something went wrong when updating game',
    });
  }
};

const deleteGame = async (req,res) => {
    try {
        const game = await Game.findOneAndDelete({
            _id: req.params.id,
            owner: req.session.user._id,
        });

        if(!game) {
            return res.status(404).json({
                error: 'Game not found.',
                id: 'InvalidGame',
            });
        }

        return res.status(200).json({
            message: 'Game deleted successfully',
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: 'An error occurred while deleting the game',
        });
    }
};

module.exports = {
    createGame,
    getGames,
    updateGame,
    deleteGame,
};