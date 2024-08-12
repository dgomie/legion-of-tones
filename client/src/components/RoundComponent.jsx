import React, { useState, useEffect } from 'react';
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
import VoteComponent from './submissions/VoteSubmission';


const RoundComponent = () => {
  const { legionId, roundId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  const [submitDeadline, setSubmitDeadline] = useState(null);
  const [voteDeadline, setVoteDeadline] = useState(null);

  useEffect(() => {
    if (data) {
      const legion = data.legion;
      const round = legion?.rounds.find((r) => r._id === roundId);

      if (round) {
        setSubmitDeadline(new Date(parseInt(round.submissionDeadline, 10)));
        setVoteDeadline(new Date(parseInt(round.voteDeadline, 10)));
      }
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

  const handleShareClick = () => {
    console.log('shared');
  };

  const handleChangeClick = () => {
    console.log('changed');
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
       <VoteComponent />
      )}
    </Box>
  );
};

export default RoundComponent;