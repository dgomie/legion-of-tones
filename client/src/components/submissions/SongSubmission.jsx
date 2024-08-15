import { useState } from 'react';
import share from '../../images/share.svg';
import change from '../../images/change.svg';
import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_SONG_TO_ROUND } from '../../utils/mutations'; // Import the mutation

const SongSubmissionComponent = ({ legion, round, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const [addSongToRound] = useMutation(ADD_SONG_TO_ROUND); // Use the mutation

  const handleShareClick = () => {
    setOpen(true);
  };

  const handleChangeClick = () => {
    console.log('changed');
    console.log('legion', legion);
    console.log('round', round);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }

    try {
      await addSongToRound({
        variables: {
          legionId: legion._id,
          roundNumber: round.roundNumber,
          songInput: {
            url,
            comment,
            userId: currentUser.data._id,
          },
        },
      });

      setOpen(false);
      setError('');
    } catch (error) {
      setError('An error occurred while submitting your song.');
    }
  };

  const hasSubmitted = round.submissions.some(
    (submission) => submission.userId === currentUser.data._id
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Your Song</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the YouTube URL of your song and a comment.
          </DialogContentText>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="YouTube URL"
            type="url"
            fullWidth
            variant="standard"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SongSubmissionComponent;