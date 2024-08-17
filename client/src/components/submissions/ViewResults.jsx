import medal from '../../images/medal.svg';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewResults = ({ legion, round }) => {
    const navigate = useNavigate()

  const handleResultsClick = () => {
    navigate(`/results/${legion._id}/${round._id}`)
  };

  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleResultsClick} sx={{ display: 'block' }}>
          <img src={medal} width="45px" />
          <Typography>View Results</Typography>
        </Button>
      </Container>
    </>
  );
};

export default ViewResults;