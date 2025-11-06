const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/apply', auth, (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    const { loan_type, name, dob, email, phone, aadhaar, account_number, ifsc_code, current_address } = req.body;

    
    db.query('UPDATE users SET name = ?, dob = ?, email = ?, phone = ?, aadhaar = ?, account_number = ?, ifsc_code = ?, current_address = ? WHERE id = ?',
        [name, dob, email, phone, aadhaar, account_number, ifsc_code, current_address, req.user.id], (err) => {
            if (err) {
                console.error('DB Error:', err);
                return res.status(500).json({ message: 'Error updating user details' });
            }

            db.query('INSERT INTO loans SET ?', { user_id: req.user.id, loan_type }, (err) => {
                if (err) {
                    console.error('DB Error:', err);
                    return res.status(500).json({ message: 'Error applying for loan' });
                }
                res.json({ message: 'Application submitted successfully' });
            });
        });
});

router.get('/applied', auth, (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    db.query('SELECT * FROM loans WHERE user_id = ?', [req.user.id], (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ message: 'Error fetching loans' });
        }
        res.json(results);
    });
});

module.exports = router;
