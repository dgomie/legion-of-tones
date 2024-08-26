import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';
import { UPDATE_ROUND } from '../utils/mutations';
import VoteComponent from './submissions/VoteSubmission';
import SongSubmissionComponent from './submissions/SongSubmission';
import AuthService from '../utils/auth';
import ViewResults from './submissions/ViewResults';

const RoundComponent = () => {
  const { legionId, roundId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  const [updateRound] = useMutation(UPDATE_ROUND);

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

      setCurrentUser(AuthService.getProfile());
    }
  }, [data, roundId]);

  const legion = data?.legion;
  const round = legion?.rounds.find((r) => r._id === roundId);

  const currentDate = new Date();

  const isBeforeSubmitDeadline = submitDeadline && currentDate < submitDeadline;
  const isBeforeVoteDeadline = voteDeadline && currentDate < voteDeadline;

  useEffect(() => {
    if (!isBeforeSubmitDeadline && !isBeforeVoteDeadline) {
      updateRound({
        variables: {
          legionId,
          roundId,
          roundData: { isComplete: true },
        },
      });
    }
  }, [isBeforeSubmitDeadline, isBeforeVoteDeadline, updateRound, legionId, roundId]);

  const handleBackClick = () => {
    navigate(`/legions/${legionId}`);
  };

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error loading data</Typography>;
  }

  if (!round) {
    return <Typography>Round not found</Typography>;
  }

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
            <Typography variant="body1">
              {formatDate(submitDeadline)}
            </Typography>
          </>
        )}
      </Box>

      {isBeforeSubmitDeadline && (
        <SongSubmissionComponent
          legion={legion}
          round={round}
          currentUser={currentUser}
        />
      )}
      {/* TODO: Separate the Vote from Listen to Playlist */}
      {!isBeforeSubmitDeadline && isBeforeVoteDeadline && (
        <VoteComponent
          legion={legion}
          round={round}
          currentUser={currentUser}
        />
      )}
      {!isBeforeSubmitDeadline && !isBeforeVoteDeadline && (
        <ViewResults
          legion={legion}
          round={round}
          currentUser={currentUser}
        />
      )}
    </Box>
  );
};

export default RoundComponent;
