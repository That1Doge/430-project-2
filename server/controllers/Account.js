const bcrypt = require('bcrypt');
const User = require('../models/User');

const signup = async (req, res) => {
  const { username, password, passwordConfirm } = req.body;

  if (!username || !password || !passwordConfirm) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      error: 'Passwords do not match.',
    });
  }

  if (username.trim().length < 3 || username.trim().length > 20) {
    return res.status(400).json({
      error: 'Username must be between 3 and 20 characters.',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters.',
    });
  }

  try {
    const existingUser = await User.findOne({
      username: username.trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'Username is already in use.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      passwordHash,
    });

    await newUser.save();

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          error: 'Could not create your session.',
        });
      }

      req.session.user = {
        _id: newUser._id,
        username: newUser.username,
      };

      return req.session.save((saveError) => {
        if (saveError) {
          return res.status(500).json({
            error: 'Could not save your session.',
          });
        }

        return res.status(201).json({
          message: 'Account created successfully.',
          redirect: '/dashboard',
        });
      });
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Username is already in use.',
      });
    }

    console.error('Signup error:', error);

    return res.status(500).json({
      error: 'An error occurred while creating your account.',
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password are required.',
    });
  }

  try {
    const user = await User.findOne({
      username: username.trim(),
    });

    if (!user) {
      return res.status(401).json({
        error: 'Incorrect username or password.',
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Incorrect username or password.',
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          error: 'Could not create your session.',
        });
      }

      req.session.user = {
        _id: user._id,
        username: user.username,
      };

      return req.session.save((saveError) => {
        if (saveError) {
          return res.status(500).json({
            error: 'Could not save your session.',
          });
        }

        return res.status(200).json({
          message: 'Login successful.',
          redirect: '/dashboard',
        });
      });
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      error: 'An error occurred while logging in.',
    });
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        error: 'Could not log out.',
      });
    }

    res.clearCookie('questlog.sid');

    return res.status(200).json({
      message: 'Logged out successfully.',
      redirect: '/',
    });
  });
};

module.exports = {
  signup,
  login,
  logout,
};
