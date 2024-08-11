import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Container,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';
import share from '../images/share.svg';
import change from '../images/change.svg';
import vote from '../images/vote.svg';
import playlist from '../images/playlist.svg';

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
    console.log('shared');
  };

  const handleChangeClick = () => {
    console.log('changed');
  };

  const handleVoteClick = () => {
    console.log('voted');
  };

  const handlePlaylistClick = () => {
    console.log('playlist');
  };

  const currentDate = new Date();
  console.log('Current Date:', currentDate);

  const submitDeadlineTimestamp = 1723586400000; // Replace with actual timestamp if different
  const voteDeadlineTimestamp = 1723586400000; // Replace with actual timestamp if different

  const submitDeadline = new Date(submitDeadlineTimestamp);
  console.log('Submission Deadline:', submitDeadlineTimestamp, submitDeadline);

  const voteDeadline = new Date(voteDeadlineTimestamp);
  console.log('Vote Deadline:', voteDeadlineTimestamp, voteDeadline);

  const isBeforeSubmitDeadline = currentDate < submitDeadline;
  const isBeforeVoteDeadline = currentDate < voteDeadline;

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  console.log('Formatted Submission Deadline:', formatDate(submitDeadline));
  console.log('Formatted Vote Deadline:', formatDate(voteDeadline));

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackClick}
        sx={{ mb: 2 }}
      >
        Back to Legion
      </Button>
      <Typography variant="h3" sx={{ fontFamily: 'medievalSharp' }}>
        Round {round.roundNumber}
      </Typography>
      <Typography variant="body1">{round.prompt}</Typography>
      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Current Date:</Typography>
        <Typography variant="body1">{formatDate(currentDate)}</Typography>
        <Typography variant="h6">Submission Deadline:</Typography>
        <Typography variant="body1">{formatDate(submitDeadline)}</Typography>
      </Box>

      {isBeforeSubmitDeadline && (
        <>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleShareClick} sx={{ display: 'block' }}>
              <img src={share} width="50px" />
              <Typography>Submit Song</Typography>
            </Button>
          </Container>

          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleChangeClick} sx={{ display: 'block' }}>
              <img src={change} width="45px" />
              <Typography>Change Song</Typography>
            </Button>
          </Container>
        </>
      )}

      {!isBeforeSubmitDeadline && isBeforeVoteDeadline && (
        <>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleVoteClick} sx={{ display: 'block' }}>
              <img src={vote} width="45px" />
              <Typography>Vote</Typography>
            </Button>
          </Container>

          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handlePlaylistClick} sx={{ display: 'block' }}>
              <img src={playlist} width="45px" />
              <Typography>Listen to Playlist</Typography>
            </Button>
          </Container>
        </>
      )}
    </Box>
  );
};

export default RoundComponent;
