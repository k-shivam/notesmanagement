const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const logger = require('../logger');

const register = async (req, res) => {
  logger.info(`Inside register function for creating new user...`)
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    logger.error(`Getting error while registration ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  logger.info(`Inside login function for signin...`)
  const { username, password } = req.body;
  try{
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  }catch(error){
    logger.error(`Getting error while logging in ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports  = {
  login,
  register
}
