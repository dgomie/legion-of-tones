import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const legions = [
  { id: 1, title: "Legion of Champions", description: "A legion of elite champions.", numPlayers: 12, maxPlayers: 15, isActive: true },
  { id: 2, title: "Legion of Heroes", description: "A legion of brave heroes.", numPlayers: 9, maxPlayers: 12, isActive: true },
  { id: 3, title: "Legion of Legends", description: "A legion of legendary figures.", numPlayers: 8, maxPlayers: 10, isActive: false },
  // Add more legions as needed
];

const LegionsComponent = () => {
  const activeLegions = legions.filter(legion => legion.isActive);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontFamily: "MedievalSharp, sans-serif",
          fontSize: "2.5rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Active Legions
      </Typography>
      {activeLegions.length > 0 ? (
        <Grid container spacing={2}>
          {activeLegions.map(legion => (
            <Grid item xs={12} sm={6} md={4} key={legion.id}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                    {legion.title}
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ textAlign: "center", marginBottom: 2 }}>
                    {legion.description}
                  </Typography>
                  <Typography variant="subtitle1" component="div" sx={{ textAlign: "center" }}>
                    {legion.numPlayers}/{legion.maxPlayers} Players
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", marginTop: 3 }}
        >
          No active legions available.
        </Typography>
      )}
    </Box>
  );
};

export default LegionsComponent;