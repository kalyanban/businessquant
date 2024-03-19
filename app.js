const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: '14', 
  password: 'Kalyan@22121999', 
  database: 'MY_DATABASE'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500);
      res.send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
  const { username, email } = req.body;
  connection.query(`INSERT INTO users (username, email) VALUES ('${username}', '${email}')`, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500);
      res.send('Error creating user');
      return;
    }
    res.status(201);
    res.send('User created successfully');
  });
});

