import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Grid,
} from '@mui/material';
import gnomes from '../images/gnomes.png';
import knight from '../images/knight.png';

const DescriptionComponent = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontFamily: 'MedievalSharp, sans-serif' }}
        >
          Welcome to the Legion of Tones
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ fontFamily: 'MedievalSharp, sans-serif' }}
        >
          Enter the Realm of Melodic Battles and Musical Magic!
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="body1" paragraph sx={{marginBottom:3}}>
          In the enchanted world of Legion of Tones, you are not just players,
          but heroes embarking on a musical quest. Channel your inner bard, and
          prepare for epic battles where your music knowledge will be your
          greatest weapon. Here’s how your journey unfolds:
        </Typography>

        <Box sx={{ display: 'flex', marginBottom: 8 }}>
          <Container>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontFamily: 'MedievalSharp, sans-serif' }}
            >
              The Quest Begins:
            </Typography>
            <List>
              <ListItem>
                <Typography variant="body1">
                  <strong>Receive a Prompt from the Oracle:</strong> Each round
                  starts with a mystical prompt. Perhaps "Best Song for a
                  Knight's Joust" or "Melody for a Sorcerer's Spell."
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Submit Your Song of Power:</strong> Players conjure
                  the song they believe best fits the prompt. Scour your
                  enchanted playlists and submit your tune of triumph!
                </Typography>
              </ListItem>
              {/* ... */}
              <ListItem>
                <Typography variant="body1">
                  <strong>Vote on Legendary Attributes:</strong> It’s time to
                  cast your votes and decide the fate of the songs based on
                  attributes like:
                  <List>
                    <ListItem>Best Song</ListItem>
                    <ListItem>Song that Best Matches the Prompt</ListItem>
                    <ListItem>Worst Song</ListItem>
                    <ListItem>Mystic’s Choice</ListItem>
                  </List>
                </Typography>
                <Container
                  sx={{
                    marginLeft: 2,
                    display: { xs: 'none', sm: 'inline' },
                    justifyContent: 'space-between',
                  }}
                >
                  <img src={knight} width="275px" />
                </Container>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Earn Glory and Points:</strong> Based on the votes,
                  points are awarded. Prove your worth and climb the ranks of
                  the musical hierarchy!
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body1">
                  <strong>Crown the League Champion:</strong> After several
                  rounds, the scores are tallied, and the hero with the most
                  points is crowned the Legion of Tones Champion!
                </Typography>
              </ListItem>
            </List>
          </Container>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 1 }}>
            <img
              src={gnomes}
              width="500px"
              style={{ margin: '0 auto', display: 'block', maxWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <Container>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontFamily: 'MedievalSharp, sans-serif' }}
              >
                Why Embark on This Musical Adventure?
              </Typography>
              <List>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Fun for All Adventurers:</strong> Perfect for
                    magical gatherings, festive feasts, or a merry evening in.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Discover Hidden Gems:</strong> Unearth songs from
                    the depths of forgotten realms.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Friendly Rivalry:</strong> Challenge your comrades
                    and see who reigns supreme in musical mastery.
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Easy to Play:</strong> Simple rules and endless
                    enchantment make it easy for any hero to join.
                  </Typography>
                </ListItem>
              </List>
            </Container>
          </Grid>
        </Grid>

        <Typography variant="body1" align="center">
          Ready to embark on this legendary journey and prove your musical
          prowess? Sign up now, rally your fellow adventurers, and let the quest
          begin!
        </Typography>
        <Box textAlign="center" my={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Join the Legion!
          </Button>
        </Box>
        <Typography
          variant="h6"
          align="center"
          mt={4}
          sx={{ fontFamily: 'MedievalSharp, sans-serif' }}
        >
          Legion of Tones – Where every song is a spell, and every player can
          become a legend!
        </Typography>
      </Box>
    </Container>
  );
};

export default DescriptionComponent;
