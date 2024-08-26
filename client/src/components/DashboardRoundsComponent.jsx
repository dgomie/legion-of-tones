import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_ROUND } from '../utils/mutations';

const RoundsComponent = ({ legion, isAdminUser, isUserInLegion }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const rounds = legion.rounds;
  const currentRound = rounds.find((round) => round.isComplete === false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    submissionDeadline: '',
    voteDeadline: '',
    prompt: '',
    roundNumber: '',
    roundId: '',
  });

  const [updateRound] = useMutation(UPDATE_ROUND);

  const handleButtonClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}`);
  };

  const handleFinalStandingsClick = (roundId) => {
    navigate(`${location.pathname}/standings`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleEditClick = (round) => {
    setFormData({
      submissionDeadline: formatDate(round.submissionDeadline),
      voteDeadline: formatDate(round.voteDeadline),
      prompt: round.prompt,
      roundNumber: round.roundNumber,
      roundId: round._id,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateRound({
        variables: {
          legionId: legion._id,
          roundId: formData.roundId,
          roundData: {
            submissionDeadline: formData.submissionDeadline,
            voteDeadline: formData.voteDeadline,
            prompt: formData.prompt,
          },
        },
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating round:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <>
      <Typography variant="h6">Current Round</Typography>
      <Card>
        <CardContent>
          {currentRound?.roundNumber ? (
            <>
              <Typography variant="h5">Round {currentRound.roundNumber}</Typography>
              <Typography variant="body2">
                {truncateString(
                  currentRound?.prompt || 'No description available',
                  100
                )}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isUserInLegion && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(currentRound?._id)}
                    disabled={!currentRound}
                  >
                    View Details
                  </Button>
                )}
                {isAdminUser && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEditClick(currentRound)}
                    disabled={!currentRound}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleFinalStandingsClick}>
              Final Standings
            </Button>
          )}
        </CardContent>
      </Card>
      <Typography variant="h6">Rounds</Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
        {Array.from({ length: legion.numRounds }).map((_, index) => (
          <Card key={index} sx={{ marginRight: 2, minWidth: 300 }}>
            <CardContent>
              <Typography variant="h5">
                {rounds[index]?.title || `Round ${index + 1}`}
              </Typography>
              <Typography variant="body2">
                {truncateString(
                  rounds[index]?.prompt || 'No description available',
                  100
                )}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isUserInLegion && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleButtonClick(rounds[index]?._id || index)
                    }
                  >
                    View Details
                  </Button>
                )}
                {isAdminUser && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEditClick(rounds[index])}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={isModalOpen} onClose={handleCancel}>
        <DialogTitle>Edit Round {formData.roundNumber}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="submissionDeadline"
            label="Submission Deadline"
            type="datetime-local"
            fullWidth
            value={formData.submissionDeadline}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="voteDeadline"
            label="Vote Deadline"
            type="datetime-local"
            fullWidth
            value={formData.voteDeadline}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="prompt"
            label="Prompt"
            type="text"
            fullWidth
            value={formData.prompt}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}
        >
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoundsComponent;