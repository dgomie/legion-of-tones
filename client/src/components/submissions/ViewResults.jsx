import playlist from '../../images/playlist.svg';
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
          <img src={playlist} width="45px" />
          <Typography>Listen to Playlist</Typography>
        </Button>
      </Container>
    </>
  );
};

export default ViewResults;