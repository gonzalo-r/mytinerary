import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';


export default function GoogleSignIn() {
       
    const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log(response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
     const logedUser = {
      email: userObject.email, 
      password:  userObject.sub, 
      image: userObject.picture,
      from: "google"
    }
    let res = await dispatch(userActions.signInUser(logedUser))
    console.log(res.data)

    if(res.data.success){
        console.log(res.data.success)
          toast.success( res.data.message)
         
        
      }  else{
               return toast.error(res.data.message)
             
            }   
  }
  useEffect(() => {
    /* global google  */
    google.accounts.id.initialize({
        client_id: '132585096354-jngh5vum1ncs00abrshn3c1iu0odqkjh.apps.googleusercontent.com', 
        context: "signup",
        callback: responseGoogle
    });

    google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: "outline", size: "large" }
    )
});

  return (
    <div>
            <div id='buttonDiv'></div>
        </div>

  );

  }
