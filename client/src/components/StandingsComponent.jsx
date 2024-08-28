import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { GET_LEGION, GET_USER_BY_ID } from '../utils/queries';
import { Link } from 'react-router-dom';

const StandingsComponent = () => {
  const { legionId } = useParams();

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading players</Typography>;
  }

  const players = data.legion.players;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Standings
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {players.map((playerId) => (
          <PlayerItem key={playerId} playerId={playerId} />
        ))}
      </List>
    </Container>
  );
};

const PlayerItem = ({ playerId }) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: playerId },
  });

  if (loading) {
    return (
      <ListItem>
        <ListItemText primary="Loading..." />
      </ListItem>
    );
  }

  if (error) {
    return (
      <ListItem>
        <ListItemText primary="Error loading player" />
      </ListItem>
    );
  }

  const player = data.userById;

  return (
    <ListItem>
      <ListItemAvatar>
        <Link to={`/profile/${data.userById.username}`}>
          <Avatar alt={player.username} src={player.profilePicture} />
        </Link>
      </ListItemAvatar>
      <ListItemText primary={player.username} />
    </ListItem>
  );
};

export default StandingsComponent;
