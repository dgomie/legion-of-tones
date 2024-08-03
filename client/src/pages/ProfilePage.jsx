import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from "../components/ProfileComponent";
import Auth from "../utils/auth";
import ProfileStatsComponent from '../components/ProfileStatsComponent';

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = Auth.loggedIn(); 

        if (!isLoggedIn) {
            navigate('/login'); 
        }
    }, [navigate]);

    return (
        <>
        <ProfileComponent />
        <ProfileStatsComponent />
        </>
    );
};

export default ProfilePage;