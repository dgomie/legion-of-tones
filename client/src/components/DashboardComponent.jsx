import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  CircularProgress,  
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LEGIONS } from "../utils/queries";
import Auth from "../utils/auth";

const DashboardComponent = () => {
  const currentUserId = Auth.getProfile().data._id

  const navigate = useNavigate();
  const [legions, setLegions] = useState([]);
  const { data, loading } = useQuery(GET_LEGIONS);

  useEffect(() => {
    if (data) {
      const activeLegions = data.legions.filter(
        (legion) => legion.isActive && legion.players.includes(currentUserId)
      );
      setLegions(activeLegions);
    }
  }, [data, currentUserId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontFamily: 'MedievalSharp, sans-serif',
          fontSize: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        Your Legions
      </Typography>
      <Box sx={{ marginY: 3 }}>
        {legions.length > 0 ? (
          <Grid container spacing={2}>
            {legions.map((legion) => (
              <Grid item xs={12} sm={6} md={4} key={legion._id}>
                <Link
                  to={`/legions/${legion._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ textAlign: 'center' }}
                      >
                        {legion.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ textAlign: 'center', marginBottom: 2 }}
                      >
                        {legion.description}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ textAlign: 'center' }}
                      >
                        {legion.numPlayers}/{legion.maxPlayers} Players
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
              sx={{ textAlign: 'center', marginTop: 3 }}
            >
              You have no active legions.
            </Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#c27ba0',
                  '&:hover': {
                    backgroundColor: '#a64d79',
                  },
                }}
                onClick={() => {
                  navigate('/legions');
                }}
              >
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
