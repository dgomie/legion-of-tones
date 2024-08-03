import { Box, Typography, Paper, Grid } from "@mui/material";
import grail from '../images/grail.svg';
import quest from '../images/quest.svg';
import vote from '../images/vote.svg';
import music from '../images/music.svg';

const ProfileStatsComponent = () => {
  const categories = ["Quests Joined", "Treasures Won", "Songs Shared", "Votes Cast"];
  const icons = [quest, grail, music, vote];
  const stats = [3, 2, 15, 54];

  return (
    <Box sx={{ marginY: 3 }}>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                borderRadius: '5px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img src={icons[index]} alt={category} style={{ width: 50, height: 50, marginBottom: 8 }} />
                <Typography sx={{color: "#708090", fontSize: '1.2rem' }}>
                  {category}
                </Typography>
                <Typography sx={{ fontSize: '1.5rem' }}>
                  {stats[index]}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileStatsComponent;