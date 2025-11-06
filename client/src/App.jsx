import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Loans from './components/Loans';
import AppliedLoans from './components/AppliedLoans';
import "../src/css/style.css"
function App() {
    return (
        <Router>
            <Navbar /> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/applied" element={<AppliedLoans />} />
            </Routes>
        </Router>
    );
}

export default App;