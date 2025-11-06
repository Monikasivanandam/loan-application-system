const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.js');  

const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.json({ message: 'User registered successfully' });
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    });
});

module.exports = router;