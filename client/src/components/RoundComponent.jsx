import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';

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

  return (
    <Box>
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp' }}>
        Legion Round
      </Typography>
      <Typography variant="body1">
        Legion ID: {legionId}
      </Typography>
      <Typography variant="body1">
        Round ID: {roundId}
      </Typography>
      <Typography variant="h5">
        Round {round.roundNumber}
      </Typography>
      <Typography variant="body1">
        {round.prompt}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackClick}>
        Back to Legion
      </Button>
    </Box>
  );
};

export default RoundComponent;