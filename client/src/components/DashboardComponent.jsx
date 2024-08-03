import { Box, Typography } from "@mui/material";

  const DashboardComponent = () => {
    

    return (
      <Box>
        <Typography sx={{fontFamily: "MedievalSharp, sans-serif", fontSize:"2.5rem", display:"flex", justifyContent:"center"}}>
          Your Quests
        </Typography>
      </Box>
    );
  };
  export default DashboardComponent;