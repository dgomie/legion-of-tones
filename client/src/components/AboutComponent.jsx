import { Box, Typography, Divider, Button } from '@mui/material';

const AboutComponent = () => {
  const handleDonateClick = () => {
    window.location.href = 'https://donate.stripe.com/3csfZl65kbeE2FG6oo';
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp' }}>
        About Us
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>
          Building and maintaining a melodically enchanted realms takes a lot of
          mana! Consider donating potions of awakening or even a coffee to help
          the dev wizards slay bugs, maintain the realms, and expand the Legion.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDonateClick}>
          Donate Here
        </Button>
      </Box>
    </Box>
  );
};

export default AboutComponent;
