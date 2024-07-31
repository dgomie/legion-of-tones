import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from "../components/ProfileComponent";
import Auth from "../utils/auth";

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <ProfileComponent />
    );
};

export default ProfilePage;