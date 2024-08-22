import { useQuery } from '@apollo/client';
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Button,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_LEGION } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const PlaylistComponent = () => {
  const navigate = useNavigate();
  const { legionId, roundId } = useParams();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  if (loading) return <CircularProgress />;
  if (error) {
    console.error('Error loading data:', error);
    return <Typography>Error loading data</Typography>;
  }

  const legion = data?.legion;
  const round = legion?.rounds.find((r) => r._id === roundId);

  if (!round) return <Typography>Round not found</Typography>;

  const submissions = round.submissions;

  const handleBackClick = () => {
    navigate(`/legions/${legionId}`);
  };

  const handleVoteClick = () => {
    navigate(`/legions/${legionId}/${roundId}/vote`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      marginBottom={1}
    >
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp' }}>
        Round {round.roundNumber} Playlist
      </Typography>
      <Typography>{round.prompt}</Typography>
      <Paper
        sx={{ my: '1rem', padding: '1rem', width: '100%', maxWidth: '600px' }}
      >
        {submissions.map((submission) => {
          const embedUrl = submission.url.replace('watch?v=', 'embed/');
          return (
            <Box
              key={submission._id}
              mb={2}
              sx={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
              }}
            >
              <iframe
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              ></iframe>
            </Box>
          );
        })}
      </Paper>
      <Container>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
          onClick={handleBackClick}
        >
          Back to Legion
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
          onClick={handleVoteClick}
        >
          Vote
        </Button>
      </Container>
    </Box>
  );
};

export default PlaylistComponent;
