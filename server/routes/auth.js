const express = require('express');
const { add, get } = require('../data/user');
const { createJSONToken, isValidPassword } = require('../util/auth');
const { isValidEmail, isValidText, isPassword } = require('../util/validation');
const bycrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email.';
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = 'Email exists already.';
      }
    } catch (error) {}
  }
  if (!isPassword(data.password)) {
    errors.password = 'Invalid password. Must be at least 5 characters long and to include 2 numbers, 2 letters and 1 special characters.';
  }
  if (!isValidText(data.fname, 3)) {
    errors.fname = 'Invalid First Name. Must be at least 3 characters long.';
  }

  if (!isValidText(data.lname, 3)) {
    errors.lname = 'Invalid Last Name. Must be at least 3 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signup failed due to validation errors.',
      errors,
    });
  }
  
  try {
    const hashedPw = await bycrypt.hash(data.password, 12);
    data.password = hashedPw;
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: 'User created.', user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed.' });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid email or password entered.' },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

module.exports = router;
