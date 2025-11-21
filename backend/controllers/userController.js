

const db = require('../models');

exports.getUsers = (req, res) => {
  db.all('SELECT id, username, role FROM users', [], (err, rows) => {
    if (err) 
return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
};
