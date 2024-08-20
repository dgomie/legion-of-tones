import { useQuery } from '@apollo/client';
import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const PlaylistComponent = () => {
  const { legionId, roundId } = useParams();

  return (
    <Typography>
      Legion ID: {legionId}, Round ID: {roundId}
    </Typography>
  );
};

export default PlaylistComponent;