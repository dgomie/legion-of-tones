import React from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const RoundsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rounds = [
    { legionId: 'legion1', roundId: 'round1', title: 'Round 1', description: 'Description for Round 1' },
    { legionId: 'legion2', roundId: 'round2', title: 'Round 2', description: 'Description for Round 2' },
    { legionId: 'legion3', roundId: 'round3', title: 'Round 3', description: 'Description for Round 3' },
  ];

  const handleButtonClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}`);
  };

  return (
    <Box>
      {rounds.map((round, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
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