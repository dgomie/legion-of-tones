import CreateLegionComponent from '../components/CreateLegionComponent';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';

function CreateLegionPage() {
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
  return (
    <>
      <CreateLegionComponent />
    </>
  );
}

export default CreateLegionPage;
