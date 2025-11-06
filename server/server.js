const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/loans', loanRoutes);

const jwt = require('jsonwebtoken');
app.use('/protected', (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Session expired' });
    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.status(401).json({ message: 'Session expired' });
        req.user = user;
        next();
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));