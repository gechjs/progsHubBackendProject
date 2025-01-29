const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com' 
},
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com'
 }
];

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  users.push({ id: users.length + 1, name, email });
  res.status(201).json({ id: users.length + 1, name, email });
});


app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const i = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: `user with ID ${id} doesn't exist` });
  }

  users.splice(i, 1);
  res.status(200).json({ message: `User with ID ${id} deleted successfully` });
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
