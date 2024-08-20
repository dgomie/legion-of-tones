import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";

function VotePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div>
            Vote
        </div>
    );
}

export default VotePage;