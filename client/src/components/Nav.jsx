import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/navlogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person';

const isLoggedIn = Auth.loggedIn();

let pages = [];
if (isLoggedIn) {
  pages = ['dashboard', 'leagues', 'profile'];
} else {
  pages = ['login', 'sign up'];
}

const settings = ['settings', 'logout'];

function Nav() {
  const navigate = useNavigate(); // navigates pages
  // const location = useLocation();
  const isLoggedIn = Auth.loggedIn(); // checks if user is logged in

  const [value, setValue] = React.useState(0);

  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => navigate('/')}>
            <img src={logo} width="150px" alt="" />
          </Button>

          {isLoggedIn && (
          <BottomNavigation
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              display: { xs: 'flex', md: 'none' },
             
            }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              navigate(`/${pages[newValue].replace(/\s+/g, '')}`);
            }}
          >
            {pages.map((page, index) => (
              <BottomNavigationAction
                key={page}
                icon={
                  index === 0 ? (
                    <HomeRoundedIcon />
                  ) : index === 1 ? (
                    <LibraryMusicRoundedIcon />
                  ) : (
                    <PersonIcon />
                  )
                }
              />
            ))}
          </BottomNavigation>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              marginRight: "8%"
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu;
                  navigate(`/${page.replace(/\s+/g, '')}`);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLoggedIn && (
             <Box sx={{ display: { xs: 'flex',}, justifyContent: {xs: 'flex-end'}, flexGrow: {xs: 1} }}>
             <Tooltip title="Open settings">
               <IconButton
                 onClick={handleOpenUserMenu}
                 sx={{ p: 0, marginLeft: 2 }}
                >
                  {/* TODO: ADD USER PROFILE PIC TO NAV */}
                  {/* <Avatar alt="" src="" /> */}
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === 'logout') {
                        Auth.logout();
                      } else {
                        navigate(`/${setting}`);
                      }
                    }}
                  >
                    <Typography textAlign="center">{toTitleCase(setting)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
