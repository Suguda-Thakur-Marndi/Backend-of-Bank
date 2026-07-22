const userModel = require('../models/user.model');

function registerUser(req, res) {
  const userData = req.body;

  userModel.createUser(userData)
    .then((newUser) => {
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
}
funtion loginUser(req,res){
  const { email, password } = req.body;
  userModel.loginUser(email, password)
    .then((user) => {
      res.status(200).json({ message: 'Login successful', user });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
}

module.exports = {
  registerUser,
};  