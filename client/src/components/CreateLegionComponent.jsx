import { Box, Typography, Divider, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

const CreateLegionComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxPlayers: "",
    numRounds: "",
    submitTiming: "",
    voteTiming: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
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
          label="Title"
          name="title"
          value={formData.title}
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
            name="submitTiming"
            value={formData.submitTiming}
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
            name="voteTiming"
            value={formData.voteTiming}
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