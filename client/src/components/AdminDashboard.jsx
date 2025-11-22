import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/admin.css"
function AdminDashboard() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in as admin first.');
                navigate('/admin-login');
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/admin/applications', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(res.data);
            } catch (err) {
                console.error('Fetch error:', err.response?.data);
                if (err.response?.status === 401) {
                    alert('Unauthorized. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/admin-login');
                }
            }
        };
        fetchApplications();
    }, [navigate]);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/admin/applications/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
        } catch (err) {
            alert('Error updating status');
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Loan Type</th>
                        <th>Status</th>
                        <th>Applied At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                        <tr key={app.id}>
                            <td>{app.name}</td>
                            <td>{app.email}</td>
                            <td>{app.loan_type}</td>
                            <td>{app.status}</td>
                            <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                            <td>
                                <button style={{ backgroundColor: "blue" }} onClick={() => updateStatus(app.id, 'approved')}>Approve</button>
                                <button className='btn-reject' onClick={() => updateStatus(app.id, 'rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;