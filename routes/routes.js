const Router = require("express").Router();

const citiesControllers = require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

Router.route("/cities")
.get(getCities)
.post(addCity)

Router.route("/cities/:id")
.get(getOneCity)
.put(modifyCity)
.delete(removeCity)

//Users
const  {signInUser,signUpUser} = require('../controllers/userControllers')

 //const passport = require("../config/passport")

const validator = require("../config/validator")

Router.route('/auth/SignUp')
.post(validator,signUpUser) //le paso desde actions user signUpUser

Router.route('/auth/SignIn')
.post(signInUser)

//Router.route("/auth/signOut")
//.post(signOutUser)

//Router.route("/verify/:uniqueString")   //recibe el link del usuario y llama con el get a funcion de verificacion
//.get(verifyEmail)   

//Router.route("/auth/signInToken")
//.get(passport.authenticate("jwt",{session: false}),checktoken)



module.exports = Router
