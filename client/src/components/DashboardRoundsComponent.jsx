import React from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const RoundsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rounds = [
    { legionId: 'legion1', roundId: 'round1', title: 'Round 1', description: 'Description for Round 1', date: '01-01-2024' },
    { legionId: 'legion1', roundId: 'round2', title: 'Round 2', description: 'Description for Round 2', date: '01-02-2024' },
    { legionId: 'legion1', roundId: 'round3', title: 'Round 3', description: 'Description for Round 3', date: '01-03-2024' },
    { legionId: 'legion1', roundId: 'round4', title: 'Round 4', description: 'Description for Round 4', date: '01-04-2024' },
    { legionId: 'legion1', roundId: 'round5', title: 'Round 5', description: 'Description for Round 5', date: '01-05-2024'},
    { legionId: 'legion1', roundId: 'round6', title: 'Round 6', description: 'Description for Round 6', date: '01-06-2024' },
  ];

  // Sort rounds from newest to oldest
  const sortedRounds = rounds.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleButtonClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}`);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {sortedRounds.map((round, index) => (
        <Card key={index} sx={{ marginRight: 2, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h5">{round.title}</Typography>
            <Typography variant="body2">{round.description}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleButtonClick(round.roundId)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RoundsComponent;