import { Box, Typography, Divider, Button, Container } from '@mui/material';
import wizard from '../images/1.png';

const AboutComponent = () => {
  const handleDonateClick = () => {
    window.location.href = 'https://donate.stripe.com/3csfZl65kbeE2FG6oo';
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp', textAlign: 'center' }}>
        About Us
      </Typography>
      <Divider sx={{ marginY: 2, width: '100%' }} />
      <img src={wizard} width='370px' />
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Typography>
          Building and maintaining a melodically enchanted realms takes a lot
          of mana! Consider donating potions of awakening or even a coffee to
          help the dev wizards slay bugs, maintain the realms, and expand the
          Legion.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDonateClick}
          sx={{ marginY: 2 }}
        >
          Donate Here
        </Button>
      </Box>
    </Container>
  );
};

export default AboutComponent;

