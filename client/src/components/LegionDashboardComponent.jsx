import { useParams } from 'react-router-dom';
import { Box, Typography, Divider, Container, Paper, Button } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LEGION } from '../utils/queries';
import { UPDATE_LEGION } from '../utils/mutations';
import PlayerName from './PlayerName';
import AuthService from '../utils/auth';

const LegionDashboardComponent = () => {
  const currentUserId = AuthService.getProfile().data._id;
  const { legionId } = useParams();
  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  const [updateLegion] = useMutation(UPDATE_LEGION);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const legion = data.legion;
  const isUserInLegion = legion.players.includes(currentUserId);

  const handleJoinLegion = async () => {
    try {
      const updatedPlayers = [...legion.players, currentUserId];
      await updateLegion({
        variables: {
          legionId: legion._id,
          updateData: { players: updatedPlayers },
        },
      });
      console.log('User joined the legion');
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
      console.log('User left the legion');
    } catch (err) {
      console.error('Error leaving the legion:', err);
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
          <Button variant="contained" color="secondary" onClick={handleLeaveLegion}>
            Leave Legion
          </Button>
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
    </Box>
  );
};

export default LegionDashboardComponent;