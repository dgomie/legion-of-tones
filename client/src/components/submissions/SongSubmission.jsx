import share from '../../images/share.svg';
import change from '../../images/change.svg';
import { Container, Button, Typography } from '@mui/material';

const SongSubmissionComponent = () => {
    const handleShareClick = () => {
        console.log('shared');
      };
    
      const handleChangeClick = () => {
        console.log('changed');
      };

  return (
    <>
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleShareClick} sx={{ display: 'block' }}>
        <img src={share} width="50px" />
        <Typography>Submit Song</Typography>
      </Button>
    </Container>

    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={handleChangeClick} sx={{ display: 'block' }}>
        <img src={change} width="45px" />
        <Typography>Change Song</Typography>
      </Button>
    </Container>
  </>
  );
};

export default SongSubmissionComponent;