import { useState, useEffect } from 'react';
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
import VoteComponent from './submissions/VoteSubmission';
import SongSubmissionComponent from './submissions/SongSubmission';
import AuthService from "../utils/auth"


const RoundComponent = () => {
  const { legionId, roundId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  const [submitDeadline, setSubmitDeadline] = useState(null);
  const [voteDeadline, setVoteDeadline] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (data) {
      const legion = data.legion;
      const round = legion?.rounds.find((r) => r._id === roundId);

      if (round) {
        setSubmitDeadline(new Date(parseInt(round.submissionDeadline, 10)));
        setVoteDeadline(new Date(parseInt(round.voteDeadline, 10)));
      }

      setCurrentUser(AuthService.getProfile())
    }
  }, [data, roundId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading data</Typography>;

  const legion = data?.legion;
  const round = legion?.rounds.find((r) => r._id === roundId);

  if (!round) return <Typography>Round not found</Typography>;

  const handleBackClick = () => {
    navigate(`/legions/${legionId}`);
  };

  const currentDate = new Date();

  const isBeforeSubmitDeadline = submitDeadline && currentDate < submitDeadline;
  const isBeforeVoteDeadline = voteDeadline && currentDate < voteDeadline;

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
        {submitDeadline && (
          <>
            <Typography variant="h6">Submission Deadline:</Typography>
            <Typography variant="body1">{formatDate(submitDeadline)}</Typography>
          </>
        )}
      </Box>

      {isBeforeSubmitDeadline && (
       <SongSubmissionComponent legion={legion} round={round} currentUser={currentUser}/>
      )}
      {/* TODO: !isBeforeSubmitDeadline */}
      {isBeforeSubmitDeadline && isBeforeVoteDeadline && (
       <VoteComponent legion={legion} round={round} currentUser={currentUser}/>
      )}
    </Box>
  );
};

export default RoundComponent;