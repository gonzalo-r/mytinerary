import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import{Link as LinkRouter} from "react-router-dom";
import { useState, useEffect,} from 'react';
import {useSelector, useDispatch} from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import userActions from '../redux/actions/userActions';
import GoogleSingIn from "./GoogleSignIn";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function Signin() {

/*   const navigate = useNavigate(); */
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const dataSingin = {
      email: event.currentTarget[0].value,
      password: event.currentTarget[2].value,
    };
    console.log(dataSingin) //chequear q los datos de formu lleguen
    let res= await dispatch(userActions.signInUser(dataSingin)); //await 
    console.log(res)
    console.log(res.data.success)

  

  if(res.data.success){  
    
      toast.success( res.data.message)
     /*  navigate("/createdUser",{replace:true}) */ //se puede poner false?
   
  }  else{
        /* if(res.data.response){       
             res.data.response.map(oneMsg =>{
           toast.error(oneMsg.message)  })             
         }else {  */
           return toast.error(res.data.message)
        /*  } */
       } } 

      

  return (
   

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item xs={12}>      
              <GoogleSingIn />
              
              </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <LinkRouter  to={"/auth/SignUp"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    
  );
}