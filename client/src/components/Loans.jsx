import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSessionExpiry from './useSessionExpiry';
import "../css/App.css"

function Loans() {
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        phone: '',
        aadhaar: '',
        account_number: '',
        ifsc_code: '',
        current_address: ''
    });
    const navigate = useNavigate();

    useSessionExpiry();

    const handleApplyClick = (loanType) => {
        setSelectedLoan(loanType);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLoan(null);
        setFormData({
            name: '',
            dob: '',
            email: '',
            phone: '',
            aadhaar: '',
            account_number: '',
            ifsc_code: '',
            current_address: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, dob, email, phone, aadhaar, account_number, ifsc_code, current_address } = formData;
        if (!name || !dob || !email || !phone || !aadhaar || !account_number || !ifsc_code || !current_address) {
            alert('All fields are required.');
            return;
        }
        if (phone.length !== 10 || isNaN(phone)) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }
        if (aadhaar.length !== 16 || isNaN(aadhaar)) {
            alert('Aadhaar number must be exactly 16 digits.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/loans/apply', { loan_type: selectedLoan, ...formData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Application submitted.');
            handleCloseModal();
            navigate('/applied');
        } catch (err) {
            alert('Error submitting application: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="loans-container">
            <h2>Loan Options</h2>
            <div className="loan-cards">
                <div className="loan-card">
                    <h3>Educational Loan</h3>
                    <p>
                        <strong>Purpose:</strong>Designed for students pursuing higher education.
                        Covers tuition fees, books, accommodation, and other expenses.
                        <br />
                        <strong>Eligibility:</strong>   Students aged 18+, enrolled in recognized institutions. <br />
                        <strong>Benefits:</strong> Low interest rates, flexible repayment terms up to 15 years.
                    </p>
                    <button style={{ backgroundColor: "#4a90e2" }} onClick={() => handleApplyClick('educational')}>Apply Now</button>
                </div>

                <div className="loan-card">
                    <h3>Agricultural Loan</h3>
                    <p>
                        <strong>Purpose:</strong> Supports farmers for crop cultivation, equipment purchase, and livestock. <br />
                        <strong>Eligibility:</strong>  Farmers with land ownership or lease. <br />
                        <strong>Benefits:</strong>  Subsidized rates, seasonal repayment options, and government-backed schemes for sustainable farming.
                    </p>
                    <button style={{ backgroundColor: "#4a90e2" }} onClick={() => handleApplyClick('agriculture')}>Apply Now</button>
                </div>

                <div className="loan-card">
                    <h3>Business Loan</h3>
                    <p>
                        <strong>Purpose:</strong>For entrepreneurs starting or expanding businesses. Covers working capital, machinery, and inventory. <br />

                        <strong>Eligibility:</strong>   Business owners with a viable plan and credit history. <br />
                        <strong>Benefits:</strong> Competitive rates, quick approval, and scalable terms.
                    </p>
                    <button style={{ backgroundColor: "#4a90e2" }} onClick={() => handleApplyClick('business')}>Apply Now</button>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>×</button>
                        <h3>Apply for {selectedLoan.charAt(0).toUpperCase() + selectedLoan.slice(1)} Loan</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="dob"
                                placeholder="Date of Birth (year-mm-dd)"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number (10 digits)"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength="10"
                                required
                            />
                            <input
                                type="text"
                                name="aadhaar"
                                placeholder="Aadhaar Number (16 digits)"
                                value={formData.aadhaar}
                                onChange={handleChange}
                                maxLength="16"
                                required
                            />
                            <input
                                type="text"
                                name="account_number"
                                placeholder="Account Number"
                                value={formData.account_number}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="ifsc_code"
                                placeholder="IFSC Code"
                                value={formData.ifsc_code}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="current_address"
                                placeholder="Current Address"
                                value={formData.current_address}
                                onChange={handleChange}
                                required
                            />
                            <button className='btn-bl' type="submit">Submit Application</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Loans;