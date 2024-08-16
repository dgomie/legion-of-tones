import { useState, useEffect } from 'react';
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
import { ADD_SONG_TO_ROUND, UPDATE_SONG } from '../../utils/mutations'; // Import the mutations

const SongSubmissionComponent = ({ legion, round, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isChange, setIsChange] = useState(false); // Add isChange state

  const [addSongToRound] = useMutation(ADD_SONG_TO_ROUND);
  const [updateSong] = useMutation(UPDATE_SONG); // Use the updateSong mutation

  useEffect(() => {
    setHasSubmitted(
      round.submissions.some(
        (submission) => submission.userId === currentUser.data._id
      )
    );
  }, [round.submissions, currentUser.data._id]);

  const handleShareClick = () => {
    setOpen(true);
    setIsChange(false); // Set isChange to false for adding a new song
  };

  const handleChangeClick = () => {
    setOpen(true);
    setIsChange(true); // Set isChange to true for updating an existing song
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }

    try {
      if (isChange) {
        // Use the updateSong mutation
        await updateSong({
          variables: {
            legionId: legion._id,
            roundNumber: round.roundNumber,
            songId: round.submissions.find(
              (submission) => submission.userId === currentUser.data._id
            )._id,
            updateData: {
              url,
              comment,
            },
          },
        });
      } else {
        // Use the addSongToRound mutation
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
      }

      setSuccess(true);
      setHasSubmitted(true);
    } catch (error) {
      setError('An error occurred while submitting your song.');
    }
  };

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
        <DialogTitle>{success ? 'Success' : isChange ? 'Update Your Song' : 'Submit Your Song'}</DialogTitle>
        <DialogContent>
          {success ? (
            <Alert severity="success">Song {isChange ? 'updated' : 'submitted'} successfully!</Alert>
          ) : (
            <>
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {!success && <Button onClick={handleSubmit}>{isChange ? 'Update' : 'Submit'}</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SongSubmissionComponent;