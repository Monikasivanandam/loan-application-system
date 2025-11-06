import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useSessionExpiry from './useSessionExpiry'; 
import "../css/App.css"

function AppliedLoans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useSessionExpiry(); 
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/loans/applied', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLoans(res.data);
            } catch (err) {
                alert('Error fetching loans: ' + (err.response?.data?.message || 'Session expired'));
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Your Applied Loans</h2>
            {loans.length === 0 ? (
                <p>No loans applied yet.</p>
            ) : (
                <ul>
                    {loans.map(loan => (
                        <li key={loan.id}>
                            Type: {loan.loan_type}, Status: {loan.status}, Applied At: {new Date(loan.applied_at).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}

export default AppliedLoans;