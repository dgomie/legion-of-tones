import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_LEGION } from "../utils/queries";
import PlayerName from "./PlayerName"; // Import the PlayerName component

const LegionDashboardComponent = () => {
  const { legionId } = useParams();
  console.log("Legion ID:", legionId);

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const legion = data.legion;

  return (
    <Box>
      <Typography>Legion ID {legionId} </Typography>
      <Typography variant="h4">{legion.name}</Typography>
      <Typography variant="body1">{legion.description}</Typography>
      <Divider />
      <Typography variant="body2">Number of Players: {legion.numPlayers}</Typography>
      <Typography variant="body2">Max Players: {legion.maxPlayers}</Typography>
      <Typography variant="body2">Active: {legion.isActive ? "Yes" : "No"}</Typography>
      <Typography variant="body2">Rounds: {legion.numRounds}</Typography>
      <Typography variant="body2">Vote Time: {legion.voteTime} Days</Typography>
      <Typography variant="body2">Submit Time: {legion.submitTime} Days</Typography>
      <Divider />
      <Typography variant="h6">Players</Typography>
      <ul>
        {legion.players.map((playerId) => (
          <li key={playerId}>
            <PlayerName playerId={playerId} /> {/* Use PlayerName component */}
          </li>
        ))}
      </ul>
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