import { Box, Typography, Button, CircularProgress, Divider, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';
import share from '../images/share.svg';
import change from '../images/change.svg';

const RoundComponent = () => {
  const { legionId, roundId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading data</Typography>;

  const legion = data?.legion;
  const round = legion?.rounds.find((r) => r._id === roundId);

  if (!round) return <Typography>Round not found</Typography>;

  const handleBackClick = () => {
    navigate(`/legions/${legionId}`);
  };

  const handleShareClick = () => {
    console.log('shared')
  }

  const handleChangeClick = () => {
    console.log('changed')
  }

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleBackClick} sx={{mb: 2}}>
        Back to Legion
      </Button>
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp' }}>
        Round {round.roundNumber}
      </Typography>
      <Typography variant="body1">{round.prompt}</Typography>
      <Divider />
      <Container sx={{display:"flex", justifyContent:"center"}}>
      <Button onClick={handleShareClick} sx={{display:"block"}}>
      <img src={share} width="50px"/>
      <Typography>Submit Song</Typography>
      </Button>
      </Container>

      <Container sx={{display:"flex", justifyContent:"center"}}>
      <Button onClick={handleChangeClick} sx={{display:"block"}}>
      <img src={change} width="45px"/>
      <Typography>Change Song</Typography>
      </Button>
      </Container>
    </Box>
  );
};

export default RoundComponent;
