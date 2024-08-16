import { useState, useEffect, useCallback, useRef } from 'react';
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
import { ADD_SONG_TO_ROUND, UPDATE_SONG } from '../../utils/mutations';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API;

const SongSubmissionComponent = ({ legion, round, currentUser }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const cache = useRef({});

  const [addSongToRound] = useMutation(ADD_SONG_TO_ROUND);
  const [updateSong] = useMutation(UPDATE_SONG);

  useEffect(() => {
    setHasSubmitted(
      round.submissions.some(
        (submission) => submission.userId === currentUser.data._id
      )
    );
  }, [round.submissions, currentUser.data._id]);

  const handleShareClick = () => {
    setOpen(true);
    setIsChange(false);
  };

  const handleChangeClick = () => {
    setOpen(true);
    setIsChange(true);
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

  const fetchSuggestions = async ({ value }) => {
    if (!value) return;

    // Check cache first
    if (cache.current[value]) {
      setSuggestions(cache.current[value]);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${value}&key=${YOUTUBE_API_KEY}`
      );
      const suggestions = response.data.items.map((item) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));
      // Store in cache
      cache.current[value] = suggestions;
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching YouTube suggestions:', error);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    debouncedFetchSuggestions({ value });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.url;

  // Function to decode HTML entities
  const decodeHtmlEntities = (text) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  // Updated renderSuggestion function
  const renderSuggestion = (suggestion) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <img
        src={`https://img.youtube.com/vi/${
          suggestion.url.split('v=')[1]
        }/0.jpg`}
        alt={suggestion.title}
        style={{ width: '50px', height: '50px', marginRight: '10px' }}
      />
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {decodeHtmlEntities(suggestion.title)}
      </span>
    </div>
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
        <DialogTitle>
          {success
            ? 'Success'
            : isChange
            ? 'Update Your Song'
            : 'Submit Your Song'}
        </DialogTitle>
        <DialogContent>
          {success ? (
            <Alert severity="success">
              Song {isChange ? 'updated' : 'submitted'} successfully!
            </Alert>
          ) : (
            <>
              <DialogContentText>
                Search for your song or copy and paste a valid YouTube url.
              </DialogContentText>
              {error && <Alert severity="error">{error}</Alert>}
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  autoFocus: true,
                  margin: 'dense',
                  label: 'YouTube URL',
                  type: 'url',
                  fullWidth: true,
                  variant: 'standard',
                  value: url,
                  onChange: (e, { newValue }) => setUrl(newValue),
                }}
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
          {!success && (
            <Button onClick={handleSubmit}>
              {isChange ? 'Update' : 'Submit'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SongSubmissionComponent;
