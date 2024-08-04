import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const legions = [
  { id: 1, title: "Legion of Champions", description: "A legion of elite champions.", numPlayers: 12, maxPlayers: 15, isActive: true },
  { id: 2, title: "Legion of Heroes", description: "A legion of brave heroes.", numPlayers: 9, maxPlayers: 12, isActive: true },
  { id: 3, title: "Legion of Legends", description: "A legion of legendary figures.", numPlayers: 8, maxPlayers: 10, isActive: false },
];

const DashboardComponent = () => {
  const navigate = useNavigate();
  const activeLegions = legions.filter((legion) => legion.isActive);

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
        {activeLegions.length > 0 ? (
          <Grid container spacing={2}>
            {activeLegions.map((legion) => (
              <Grid item xs={12} sm={6} md={4} key={legion.id}>
                <Link
                  to={`/legions/${legion.id}`}
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
                        {legion.title}
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
