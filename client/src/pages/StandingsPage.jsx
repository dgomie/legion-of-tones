import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

function StandingsPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());

    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return <div>Standings</div>;
}

export default StandingsPage;
