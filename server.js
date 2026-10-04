const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// create db
const db = new DatabaseSync(path.join(__dirname, 'users.db'));

// create user table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    passwordHash TEXT NOT NULL
  )
`);

// add test user
const testUser = db.prepare('INSERT OR IGNORE INTO users (email, passwordHash) VALUES (?, ?)');
testUser.run('test@test.com', bcrypt.hashSync('password123', 10));

// validate users
function validate(email, password) { // inpout validation
  if (!email || !password) return 'Email and password are required.';
  if (!email.includes('@')) return 'Please enter a valid email address.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

// get users
const findUser = db.prepare('SELECT * FROM users WHERE email = ?'); // prevents sql injection

// API
app.post('/api/login', (req, res) => {
  // get payload
  const { email, password } = req.body || {};

  // validate
  const error = validate(email, password);
  if (error) {
    return res.status(400).json({ message: error });
  }

  // compare
  const user = findUser.get(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  return res.json({ message: 'successfully logged in' });
});

// port
app.listen(PORT, () => {
  console.log(`Login form running at http://localhost:${PORT}`);
});
