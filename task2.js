const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authenticateToken = require('./authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  users.push({ username, password });
  res.send('User registered successfully!');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.send('User not found');
  }

  if (user.password !== password) {
    return res.send('Invalid password');
  }

  const token = jwt.sign({ username: user.username }, 'secret');
  res.send({ token });
});

app.get('/profile', authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

app.listen(5000, () => {
  console.log('running on port 5000');
});
