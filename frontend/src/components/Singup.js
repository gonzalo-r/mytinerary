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
import Select from '@mui/material/Select';
import{Link as LinkRouter, Navigate, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import GoogleSignUp from '../components/GoogleSignUp'
import userActions from '../redux/actions/userActions';

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

export default function Signup() {                 //funcion q captura los datos

  const [country,setcountry] = useState("")
  var countries = ["","Mexico","U.S.A.","Brazil","Argentina","Tailandia","China","Singapur","Japan","Spain","England","France","Italy","Fiyi","Autralia","New Zealand","Marshall Islands","Other Country"]
  

/*   function selected(event) {
    console.log(event.target.value)
    setcountry(event.target.value)
} */

  const navigate = useNavigate()
  const dispatch=useDispatch()

  
async function handleSubmit(event) {
    event.preventDefault();
     //const data1 = new FormData(event.currentTarget);
     console.log(country )
     const data={
      firstName: event.currentTarget[0].value, //acomodar segun como llegue la info
      lastName:event.currentTarget[2].value,
      email: event.currentTarget[8].value,
      password: event.currentTarget[10].value,
      image:event.currentTarget[6].value,
      country:"argentina",
      from: "form-Signup",
     };
     console.log(data) //chequear q los datos de formu lleguen
     let res= await dispatch(userActions.signUpUser(data)); //await 
     console.log(res)
    
   
   if(res.data.success){
     try{     
       toast.success( res.data.message)
       navigate("/createdUser",{replace:true}) //se puede poner false?
     } catch(error) {
       console.log(error)
     }
   }  else{
         if(res.data.response){       
              res.data.response.map(oneMsg=>{
            toast.error(oneMsg.message)  })             
          }else { 
            return toast.error(res.data.message)
          }
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
             
              <TextField
                 
                 required
                 fullWidth
                 label="Country"
                 autoFocus
                 select
                 name="country"
                 id="country" 
                 onChange={e=>setcountry(e.target.value)} 
                 >
                  {countries.map( oneCountry =>
                  <option key={oneCountry} value={oneCountry}>{oneCountry}</option>)} 
                              
                </TextField>
               
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="photoUser"
                  label="Photo User"
                  name="Photo"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
          
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          
            <Grid item xs={12}>      
              <GoogleSignUp />
              
              </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkRouter to={"/auth/SignIn"} variant="body2">
                  Already have an account? Sign in
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
/* const mapDispatchToProps={
   signUpUser: userActions.signUpUser,

}
const mapStateToProps = (state) =>{
  return{
    message: state.userReducer.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp); */