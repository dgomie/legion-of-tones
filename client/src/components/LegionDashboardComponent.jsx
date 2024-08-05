import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { useQuery } from '@apollo/client';
import { GET_LEGION } from "../utils/queries";
import Auth from "../utils/auth";

const LegionDashboardComponent = () => {
  const { legionId } = useParams();
  console.log("Legion ID:", legionId);

  const { loading, error, data } = useQuery(GET_LEGION, {
    variables: { id: legionId },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const legion = data?.legion || {
    _id: "placeholder-id",
    name: "Placeholder Legion",
    description: "This is a placeholder description for the legion.",
    numPlayers: 5,
    maxPlayers: 10,
    players: ["player1", "player2", "player3", "player4", "player5"],
    isActive: true,
    numRounds: 3,
    voteTime: 60,
    submitTime: 120,
    rounds: [
      { roundNumber: 1, details: "Round 1 details" },
      { roundNumber: 2, details: "Round 2 details" },
      { roundNumber: 3, details: "Round 3 details" },
    ],
  };

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
      <Typography variant="body2">Vote Time: {legion.voteTime} seconds</Typography>
      <Typography variant="body2">Submit Time: {legion.submitTime} seconds</Typography>
      <Divider />
      <Typography variant="h6">Players</Typography>
      <ul>
        {legion.players.map((playerId) => (
          <li key={playerId}>{playerId}</li>
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