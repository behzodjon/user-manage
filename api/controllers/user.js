const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');

// Assigning users to the variable User
const User = db.users;

//signing a user up
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, 'ydwygyegyegcveyvcyegc', {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('user', JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send('Details are not correct');
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email,
        status: 'active',
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, 'ydwygyegyegcveyvcyegc', {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('user', JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send('Authentication failed');
      }
    } else {
      return res.status(401).send('Authentication failed');
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  console.log('asdas');
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
const destroy = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
    cascade: true,
  });
  res.status(204).send();
};

const index = (req, res) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const block = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    } else {
      await user.update({ status: 'blocked' });
      res.status(200).send({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  signup,
  login,
  logout,
  index,
  destroy,
  block,
};
