import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import { useState } from "react";

const CreateLegionComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
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
          label="Name"
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
        <TextField
          label="Max Number of Players"
          name="maxPlayers"
          value={formData.maxPlayers}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Number of Rounds"
          name="numRounds"
          value={formData.numRounds}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Timing to Submit Songs (in days)"
          name="submitTiming"
          value={formData.submitTiming}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Timing to Listen and Vote (in days)"
          name="voteTiming"
          value={formData.voteTiming}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Create Legion
        </Button>
      </Box>
    </Box>
  );
};

export default CreateLegionComponent;