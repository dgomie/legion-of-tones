import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from "../utils/queries";
import { Avatar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const PlayerName = ({ playerId }) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: playerId },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Typography>
      <Link to={`/profile/${data.userById.username}`}>
        <Avatar
          alt="Profile Picture"
          className="avatar"
          sx={{
            width: '75px',
            height: '75px',
            marginBottom: 2,
          }}
          src={data.userById.profilePicture}
        />
      </Link>
    </Typography>
  );
};

export default PlayerName;