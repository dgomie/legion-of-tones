import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Container, Paper, Button, Modal } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';
import { UPDATE_LEGION, REMOVE_LEGION } from '../utils/mutations';
import PlayerName from './PlayerName';
import RoundsComponent from './DashboardRoundsComponent';
import AuthService from '../utils/auth';

const LegionDashboardComponent = () => {
  const navigate = useNavigate();
  const currentUserId = AuthService.getProfile().data._id;
  const { legionId } = useParams();
  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  const [updateLegion] = useMutation(UPDATE_LEGION);
  const [removeLegion] = useMutation(REMOVE_LEGION);
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const legion = data.legion;
  const isUserInLegion = legion.players.includes(currentUserId);
  const isAdminUser = currentUserId === legion.adminUser;

  const handleJoinLegion = async () => {
    try {
      const updatedPlayers = [...legion.players, currentUserId];
      await updateLegion({
        variables: {
          legionId: legion._id,
          updateData: { players: updatedPlayers },
        },
      });
    } catch (err) {
      console.error('Error joining the legion:', err);
    }
  };

  const handleLeaveLegion = async () => {
    try {
      const updatedPlayers = legion.players.filter(playerId => playerId !== currentUserId);
      await updateLegion({
        variables: {
          legionId: legion._id,
          updateData: { players: updatedPlayers },
        },
      });
    } catch (err) {
      console.error('Error leaving the legion:', err);
    }
  };

  const handleDeleteLegion = async () => {
    try {
      await removeLegion({
        variables: {
          legionId: legion._id,
        },
      });
      setModalOpen(false);
      navigate('/legions');
    } catch (err) {
      console.error('Error deleting the legion:', err);
    }
  };

  return (
    <Box>
      <Typography>Legion ID {legionId} </Typography>
      <Typography variant="h4">{legion.name}</Typography>
      <Typography variant="body1">{legion.description}</Typography>
      {!isUserInLegion && legion.numPlayers < legion.maxPlayers ? (
        <Button variant="contained" color="primary" onClick={handleJoinLegion}>
          Join Legion
        </Button>
      ) : (
        isUserInLegion && (
          isAdminUser ? (
            <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>
              Delete Legion
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleLeaveLegion}>
              Leave Legion
            </Button>
          )
        )
      )}
      <Divider />
      
      <Typography variant="body2">
        Number of Players: {legion.numPlayers}
      </Typography>
      <Typography variant="body2">Max Players: {legion.maxPlayers}</Typography>
      <Typography variant="body2">
        Active: {legion.isActive ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="body2">Rounds: {legion.numRounds}</Typography>
      <Typography variant="body2">Vote Time: {legion.voteTime} Days</Typography>
      <Typography variant="body2">
        Submit Time: {legion.submitTime} Days
      </Typography>
      <Divider />
      <Typography variant="h6">Players</Typography>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: '5px' }}>
        <Container
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: {
              xs: 'center', // Center on extra-small screens (mobile)
              sm: 'flex-start', // Align to the start on small screens and up
            },
          }}
        >
          {legion.players.map((playerId) => (
            <Box key={playerId} sx={{ display: 'inline-flex' }}>
              <PlayerName playerId={playerId} />{' '}
              {/* Use PlayerName component */}
            </Box>
          ))}
        </Container>
      </Paper>
      <Divider />
      <Typography variant="h6">Rounds</Typography>
      <ul>
        {legion.rounds.map((round, index) => (
          <li key={index}>{JSON.stringify(round)}</li>
        ))}
      </ul>
      <RoundsComponent />

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="delete-legion-modal-title"
        aria-describedby="delete-legion-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography id="delete-legion-modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="delete-legion-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this legion? This action cannot be undone.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="secondary" onClick={handleDeleteLegion}>
              Delete
            </Button>
            <Button variant="contained" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LegionDashboardComponent;