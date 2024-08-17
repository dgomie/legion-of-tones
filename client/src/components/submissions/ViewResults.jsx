import medal from '../../images/medal.svg';
import { Container, Button, Typography } from '@mui/material';

const ViewResults = ({ legion, round }) => {

  const handleResultsClick = () => {
    console.log('playlist');
    console.log('legion', legion);
    console.log('round', round);
  };

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleResultsClick} sx={{ display: 'block' }}>
          <img src={medal} width="45px" />
          <Typography>View Results</Typography>
        </Button>
      </Container>
    </>
  );
};

export default ViewResults;