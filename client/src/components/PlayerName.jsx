import React from "react";
import { useQuery } from '@apollo/client';
import { GET_USER_BY_ID } from "../utils/queries";
import { Typography } from "@mui/material";

const PlayerName = ({ playerId }) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: playerId },
  });

  console.log(data)

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return <Typography>{data.userById.username}</Typography>;
};

export default PlayerName;