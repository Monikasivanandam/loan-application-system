const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

const adminAuth = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    next();
};

router.get('/applications', auth, adminAuth, (req, res) => {
    db.query(`
        SELECT loans.id, loans.loan_type, loans.status, loans.applied_at, users.name, users.email
        FROM loans
        JOIN users ON loans.user_id = users.id
    `, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching applications' });
        res.json(results);
    });
});

router.put('/applications/:id', auth, adminAuth, (req, res) => {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    db.query('UPDATE loans SET status = ? WHERE id = ?', [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating status' });
        res.json({ message: 'Status updated successfully' });
    });
});

module.exports = router;