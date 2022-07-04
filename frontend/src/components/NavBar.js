import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import{Link as LinkRouter} from "react-router-dom";
import user1 from "../img/user1.png";
import logo from "../img/logoAvion1.png";
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import userActions from '../redux/actions/userActions';


const pages = ['Home', 'Cities'];


const NavBar = () => {
  const dispatch = useDispatch();
  const settings = [ <LinkRouter to="/auth/SignIn" style={{textDecoration: "None"}}>SignIn</LinkRouter> ,
<LinkRouter to="/auth/SignUp" style={{textDecoration: "None"}}>SignUp</LinkRouter>,
<LinkRouter 
onClick={()=>{ 
  dispatch(userActions.signOutUser())
toast("Logout")}}
to="/auth/signOut"   style={{textDecoration: "None"}}>Logout</LinkRouter>];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
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
     <AppBar position="static"  style={{backgroundColor: "black" }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         {/*  <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
               color: 'inherit', 
              textDecoration: 'none',
            }}
          >
            <img src={logo} style={{height:"8vh", margin:"0 0.5rem"}} alt="logo"/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{textDecoration: "None"}} textAlign="center">
                    <LinkRouter   to={page} style={{ textDecoration: "None"}}>{page}</LinkRouter>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} style={{height:"8vh", margin:"0 0.5rem"}} alt="logo"/>
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <LinkRouter to={page} style={{color: 'white', textDecoration: "None"}}>{page}</LinkRouter>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
             

             
              
            <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <img src={user1} style={{height:"6vh", margin:"0 0.5rem"}} alt="logo"/>
           
            
              
              
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                  
        
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
