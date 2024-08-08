import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import LegionRoundComponent from '../components/LegionRoundComponent';

function LegionDashboardPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());

    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
  <>
  <LegionRoundComponent />

  </>)
  ;
}

export default LegionDashboardPage;