import {
  Box,
  Grid,
  Avatar,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useRef, useEffect } from 'react';
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const ProfileComponent = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const fileInputRef = useRef(null); // file input
  const [avatarUrl, setAvatarUrl] = useState(''); // avatar urls
  const [isHovering, setIsHovering] = useState(false); // setting state for hovers for profile picture
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // TODO: navigate to 404 page when profile doesn't exist
  const navigate = useNavigate();

  const { usernameParam } = useParams();
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: usernameParam },
  });

  useEffect(() => {
    if (!loading) {
      const profile = Auth.getProfile();

      if (data) {
        setUsername(data.user.username);
        setUserId(data.user._id);
        getImage(data.user._id);
        setDateJoined(data.user.formattedCreatedAt);
        if (data.user.username === profile.data.username) {
          setIsCurrentUser(true);
        }
      } else {
        navigate('/404')
      }
    }
  }, [data, loading, isCurrentUser]);

  // Function to fetch user image
  function getImage(userId) {
    if (!userId) return;
    const hostUrl = import.meta.env.VITE_HOST_URL;
    fetch(`${hostUrl}/profileImage/${userId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAvatarUrl(data.data.profilePicture);
      })
      .catch((error) => console.error('Error fetching image:', error));
  }

  // function to upload user image
  const uploadImage = async (imageString) => {
    const hostUrl = import.meta.env.VITE_HOST_URL;
    fetch(`${hostUrl}/upload`, {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        avatarUrl: imageString,
        userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  };

  // profile picture handlers
  const handleAvatarClick = () => {
    if (isCurrentUser) {
      fileInputRef.current.click();
    }
  };

  // handler for file changes
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageString = reader.result;
        setAvatarUrl(imageString);
        uploadImage(imageString);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: '5px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {isCurrentUser && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            )}
            <Box
              sx={{
                position: 'relative',
                width: 100,
                height: 100,
                '&:hover': {
                  '& .editIcon': {
                    display: 'flex',
                  },
                  '&:hover': {
                    filter: 'grayscale(30%) brightness(70%)',
                    svg: {
                      fill: '#696969',
                    },
                  },
                },
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Avatar
                alt="Profile Picture"
                className="avatar"
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 2,
                  cursor: isCurrentUser ? 'pointer' : 'default',
                }}
                onClick={handleAvatarClick}
                src={avatarUrl}
              >
                {!avatarUrl && isCurrentUser && <EditIcon />}
              </Avatar>
              {avatarUrl && isHovering && isCurrentUser && (
                <EditIcon
                  className="editIcon"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 24,
                    height: 24,
                    color: 'white',
                    zIndex: 2,
                    cursor: 'pointer',
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', padding: '10px', fontWeight: 'bold' }}
          >
            {username}
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            Member Since {dateJoined}
          </Typography>
        </Paper>
      </Grid>
    </Box>
  );
};
export default ProfileComponent;
