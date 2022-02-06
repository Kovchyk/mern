const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();
const config = require('config');

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must have at list 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data during register',
      });
    }

    const {email, password} = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: 'The user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'The user has been created' });
  } catch (e) {
    res.status(500).json({ message: 'Something got wrong, try again' });
  }
});

router.post(
  '/login',
  [
    check('email', 'Enter a correct email').normalizeEmail().isEmail(),
    check('password', 'Enter email').exists(),
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data during login',
        });
      }
  
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Can\'t find the user' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something got wrong, try again' });
    }
  }
);

module.exports = router;