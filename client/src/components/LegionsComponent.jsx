import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@apollo/client';
import { GET_LEGIONS } from "../utils/queries";

const LegionsComponent = () => {
  const [legions, setLegions] = useState([]);
  const { data, loading } = useQuery(GET_LEGIONS);

  useEffect(() => {
    if (data) {
      console.log(data);
      const activeLegions = data.legions.filter((legion) => legion.isActive);
      setLegions(activeLegions);
    }
  }, [data]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const activeLegions = legions.filter((legion) => legion.isActive);
  const count = Math.ceil(activeLegions.length / itemsPerPage);
  const displayedLegions = activeLegions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

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
          marginBottom: 3,
        }}
      >
        Active Legions
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#c27ba0',
            '&:hover': {
              backgroundColor: '#a64d79',
            },
          }}
          component={Link}
          to="/legions/create-legion"
        >
          <AddIcon sx={{ padding: '4px' }} />
          Create New Legion
        </Button>
      </Box>
      {activeLegions.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {displayedLegions.map((legion) => (
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
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Pagination
              count={count}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: 'center', marginTop: 3 }}
        >
          No active legions available.
        </Typography>
      )}
    </Box>
  );
};

export default LegionsComponent;