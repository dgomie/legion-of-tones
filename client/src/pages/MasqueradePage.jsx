import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";

function MasqueradePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div>
            Melody Mascarade
        </div>
    );
}

export default MasqueradePage;
