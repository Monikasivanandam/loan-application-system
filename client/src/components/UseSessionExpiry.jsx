import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/App.css"


const useSessionExpiry = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                localStorage.removeItem('token');
                alert('Session expired due to inactivity.');
                navigate('/');  
            }, 5600000);  
        };

        resetTimer();

        const handleActivity = () => resetTimer();
        
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keydown', handleActivity);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keydown', handleActivity);
        };
    }, [navigate]); 
};

export default useSessionExpiry;
