// DashboardRoundsComponent.jsx
import React from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const RoundsComponent = ({ legion , isAdminUser}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sort rounds from newest to oldest
  const sortedRounds = legion.rounds.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleButtonClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}`);
  };

  const handleEditClick = (roundId) => {
    navigate(`${location.pathname}/${roundId}/edit`);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {Array.from({ length: legion.numRounds }).map((_, index) => (
        <Card key={index} sx={{ marginRight: 2, minWidth: 300 }}>
          <CardContent>
            <Typography variant="h5">{sortedRounds[index]?.title || `Round ${index + 1}`}</Typography>
            <Typography variant="body2">{sortedRounds[index]?.description || 'No description available'}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleButtonClick(sortedRounds[index]?.roundId || index)}
              >
                View Details
              </Button>
              {isAdminUser && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleEditClick(sortedRounds[index]?.roundId || index)}
                >
                  Edit
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RoundsComponent;