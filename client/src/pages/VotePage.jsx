import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import VoteComponent from '../components/VoteComponent'

function VotePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Auth.loggedIn();

    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
   <VoteComponent />
  );
}

export default VotePage;
