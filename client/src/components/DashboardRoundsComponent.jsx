// DashboardRoundsComponent.jsx
import React from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const RoundsComponent = ({ legion , isAdminUser}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use the original rounds array directly
  const rounds = legion.rounds;
  const currentRound = rounds.find(round => round.isComplete === false);

  console.log(currentRound);

  const handleButtonClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}`);
  };

  const handleEditClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}/edit`);
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
        <Typography variant="h5">Round {currentRound.roundNumber}</Typography>
        <Typography variant="body2">{truncateString(currentRound?.prompt || 'No description available', 100)}</Typography>
        <Divider sx={{ marginY: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleButtonClick(currentRound?._id)}
            disabled={!currentRound}
          >
            View Details
          </Button>
          {isAdminUser && (
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => handleEditClick(currentRound?._id)}
              disabled={!currentRound}
            >
              Edit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
    <Typography variant="h6">Rounds</Typography>
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {Array.from({ length: legion.numRounds }).map((_, index) => (
        <Card key={index} sx={{ marginRight: 2, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h5">{rounds[index]?.title || `Round ${index + 1}`}</Typography>
            <Typography variant="body2">{truncateString(rounds[index]?.prompt || 'No description available', 100)}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleButtonClick(rounds[index]?._id || index)}
              >
                View Details
              </Button>
              {isAdminUser && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleEditClick(rounds[index]?._id || index)}
                >
                  Edit
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
    </>
  );
};

export default RoundsComponent;