import vote from '../../images/vote.svg';
import playlist from '../../images/playlist.svg';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VoteComponent = ({ legion, round }) => {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    navigate(`/vote/${round._id}`)
  };

  const handlePlaylistClick = () => {
    console.log('playlist');
    console.log('legion', legion);
    console.log('round', round);
  };

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handlePlaylistClick} sx={{ display: 'block' }}>
          <img src={playlist} width="45px" />
          <Typography>Listen to Playlist</Typography>
        </Button>
      </Container>

      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleVoteClick} sx={{ display: 'block' }}>
          <img src={vote} width="45px" />
          <Typography>Vote</Typography>
        </Button>
      </Container>
    </>
  );
};

export default VoteComponent;
