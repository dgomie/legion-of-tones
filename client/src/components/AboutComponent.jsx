import { Box, Typography, Divider, Button } from '@mui/material';

const AboutComponent = () => {
  return (
    <Box>
      <Typography variant='h3' sx={{fontFamily: "medievalSharp"}}>   About Us</Typography>
      <Divider sx={{ marginY: 2 }} />
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>Building and maintaining a melodically enchanted realms takes a lot of mana! Consider donating the dev wizards some potions of awakening</Typography>
        <Button variant="contained" color="primary" >Donate Here</Button>
      </Box>
    </Box>
  );
};
export default AboutComponent;