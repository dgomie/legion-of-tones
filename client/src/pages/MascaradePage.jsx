import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";

function MascaradePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (isLoggedIn) {
            navigate('/dashboard'); 
        }
    }, [navigate]);

    return (
        <div>
            Melody Mascarade
        </div>
    );
}

export default MascaradePage;
