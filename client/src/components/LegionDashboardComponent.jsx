import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Container, Paper, Button, Modal, TextField } from '@mui/material';
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
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const [legionSettings, setLegionSettings] = useState({
    name: '',
    description: '',
    maxPlayers: 0,
    voteTime: 0,
    submitTime: 0,
  });

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

  const handleUpdateLegion = async () => {
    try {
      const updatedSettings = {
        ...legionSettings,
        maxPlayers: parseInt(legionSettings.maxPlayers, 10),
        voteTime: parseInt(legionSettings.voteTime, 10),
        submitTime: parseInt(legionSettings.submitTime, 10),
      };
      await updateLegion({
        variables: {
          legionId: legion._id,
          updateData: updatedSettings,
        },
      });
      setModalOpen(false);
    } catch (err) {
      console.error('Error updating the legion:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLegionSettings({
      ...legionSettings,
      [name]: value,
    });
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
              Legion Settings
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
      <RoundsComponent legion={legion} isAdminUser={isAdminUser}/>

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="legion-settings-modal-title"
        aria-describedby="legion-settings-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: isConfirmDelete ? 300 : 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          {isConfirmDelete ? (
            <>
              <Typography id="legion-settings-modal-title" variant="h6" component="h2">
                Confirm Delete
              </Typography>
              <Typography id="legion-settings-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this legion? This action cannot be undone.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex-column', justifyContent: 'center' }}>
              <Button variant="contained" sx={{mb:1, width: '100%'}} onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="secondary" sx={{width: '100%'}} onClick={handleDeleteLegion}>
                  Confirm Delete
                </Button>
              
              </Box>
            </>
          ) : (
            <>
              <Typography id="legion-settings-modal-title" variant="h6" component="h2">
                Legion Settings
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={legionSettings.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={legionSettings.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Max Players"
                name="maxPlayers"
                type="number"
                value={legionSettings.maxPlayers}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Vote Time (Days)"
                name="voteTime"
                type="number"
                value={legionSettings.voteTime}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Submit Time (Days)"
                name="submitTime"
                type="number"
                value={legionSettings.submitTime}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={handleUpdateLegion}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setConfirmDelete(true)}>
                  Delete Legion
                </Button>
                <Button variant="contained" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default LegionDashboardComponent;