import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
  } from "@mui/material";
  import hero from "../images/lot-hero.png";


  const HomeComponent = () => {
    return (
      <div style={{paddingBottom:'50px'}}>
      <img src={hero} width="100%" alt="" />
      </div>
    );
  };
  export default HomeComponent;