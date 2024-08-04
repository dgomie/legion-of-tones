import { Box, Typography, Grid, Card, CardContent, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const leagues = [
  // { id: 1, name: "League of Champions", isActive: true, numPlayers: 12, maxPlayers: 15 },
  // { id: 2, name: "League of Heroes", isActive: true, numPlayers: 9, maxPlayers: 12  },
  // { id: 3, name: "League of Champions", isActive: false, numPlayers: 2, maxPlayers: 10 },
  // { id: 4, name: "League of Legends", isActive: true, numPlayers: 8, maxPlayers: 10  },
  // { id: 5, name: "League of Heroes", isActive: true, numPlayers: 6, maxPlayers: 12  },
  // { id: 6, name: "League of Champions", isActive: false, numPlayers: 4, maxPlayers: 8 },
];

const DashboardComponent = () => {
  const activeLeagues = leagues.filter(league => league.isActive);

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
          fontFamily: "MedievalSharp, sans-serif",
          fontSize: "2.5rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center", 
        }}
      >
        Your Legions
      </Typography>
      <Box sx={{ marginY: 3 }}>
        {activeLeagues.length > 0 ? (
          <Grid container spacing={2}>
            {activeLeagues.map(league => (
              <Grid item xs={12} sm={6} md={4} key={league.id}>
                <Link to={`/legions/${league.id}`} style={{ textDecoration: 'none' }}>
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
                        {league.name}
                      </Typography>
                      <Typography variant="subtitle1" component="div" sx={{ textAlign: "center" }}>
                        {league.numPlayers}/{league.maxPlayers} Players
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", marginTop: 3 }}
          >
            You have no active legions.
          </Typography>
          <Container sx={{display:"flex", justifyContent:"center"}}>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#c27ba0',
            '&:hover': {
              backgroundColor: '#a64d79',
            },}}>
            Join a new Legion
          </Button>
          </Container>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DashboardComponent;