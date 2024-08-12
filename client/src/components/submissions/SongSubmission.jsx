import share from '../../images/share.svg';
import change from '../../images/change.svg';
import { Container, Button, Typography } from '@mui/material';

const SongSubmissionComponent = ({ legion, round, currentUser }) => {
  const handleShareClick = () => {
    console.log('shared');
    console.log('legion', legion);
    console.log('round', round);
  };

  const handleChangeClick = () => {
    console.log('changed');
    console.log('legion', legion);
    console.log('round', round);
  };

  const hasSubmitted = round.submissions.some(
    (submission) => submission.userId === currentUser.id
  );

  return (
    <>
      {!hasSubmitted && (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleShareClick} sx={{ display: 'block' }}>
            <img src={share} width="50px" />
            <Typography>Submit Song</Typography>
          </Button>
        </Container>
      )}
      {hasSubmitted && (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleChangeClick} sx={{ display: 'block' }}>
            <img src={change} width="45px" />
            <Typography>Change Song</Typography>
          </Button>
        </Container>
      )}
    </>
  );
};

export default SongSubmissionComponent;
