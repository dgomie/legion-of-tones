import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
  } from "@mui/material";
  import Auth from "../utils/auth"
  import hero from "../images/lot-hero.png";
  


  const HomeComponent = () => {
    const isLoggedIn = Auth.loggedIn();
    const navigate = useNavigate(); 

    return (
      <div style={{paddingBottom:'50px'}}>
      <img src={hero} width="100%" alt="" />
      {!isLoggedIn && (
      <Box sx={{ padding: 1, display: "flex", justifyContent:"center"}}>
      <Button sx={{margin:1}} variant="contained" onClick={() => {navigate('/login')}}>Login</Button>
      <Button sx={{margin:1}} variant="contained" onClick={() => {navigate('/signup')}}>Sign Up</Button>
      </Box>
      )}
      </div>
    );
  };
  export default HomeComponent;