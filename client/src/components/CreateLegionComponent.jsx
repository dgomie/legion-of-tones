import { Box, Typography, Divider, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthService from "../utils/auth";
import { ADD_LEGION, INCREMENT_NUM_LEGIONS } from "../utils/mutations";

const CreateLegionComponent = () => {
  const currentUserId = AuthService.getProfile().data._id;
  const [addLegion] = useMutation(ADD_LEGION);
  const [incrementNumLegions] = useMutation(INCREMENT_NUM_LEGIONS)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxPlayers: "",
    numRounds: "",
    submitTime: "",
    voteTime: ""
  });

  const navigate = useNavigate(); // Get the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "numRounds" || name === "submitTime" || name === "voteTime" ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addLegion({
        variables: {
          legionData: formData,
          currentUserId
        },
      });
      const newLegionId = data?.addLegion?._id; // Safely access the ID
      if (newLegionId) {
        await incrementNumLegions({
          variables: {
            userId: currentUserId,
          },
        });

        navigate(`/legions/${newLegionId}`); // Navigate to the new legion's page
      } else {
        console.error("New Legion ID is undefined");
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      if (error.networkError) {
        console.error("Network Error:", error.networkError);
      }
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="div" sx={{ textAlign: "center", marginBottom: 2, fontFamily: "MedievalSharp" }}>
        Create a New Legion
      </Typography>
      <Divider sx={{ width: "100%", marginBottom: 2 }} />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <TextField
          label="Legion Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Max Number of Players</InputLabel>
          <Select
            label="Max Number of Players"
            name="maxPlayers"
            value={formData.maxPlayers}
            onChange={handleChange}
          >
            {[...Array(14).keys()].map(i => (
              <MenuItem key={i + 3} value={i + 3}>{i + 3}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Number of Rounds"
          name="numRounds"
          value={formData.numRounds}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Timing to Submit Songs (in days)</InputLabel>
          <Select
            label="Timing to Submit Songs (in days)"
            name="submitTime"
            value={formData.submitTime}
            onChange={handleChange}
          >
            {[...Array(5).keys()].map(i => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Timing to Listen and Vote (in days)</InputLabel>
          <Select
            label="Timing to Listen and Vote (in days)"
            name="voteTime"
            value={formData.voteTime}
            onChange={handleChange}
          >
            {[...Array(5).keys()].map(i => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#c27ba0',
            '&:hover': {
              backgroundColor: '#a64d79',
            }, }}>
          Create Legion
        </Button>
      </Box>
    </Box>
  );
};

export default CreateLegionComponent;