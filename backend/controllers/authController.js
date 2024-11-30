const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
