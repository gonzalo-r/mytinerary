const Router = require("express").Router();


//Cities
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
const  {signInUser,signUpUser, verificarToken, verifyEmail } = require('../controllers/userControllers') //, signOutUser

 const passport = require("../config/passport")

const validator = require("../config/validator")

//Router users

Router.route('/auth/SignUp')
.post(validator,signUpUser) //si pasa el validador sigue a signUpUser(el c ontrolador)le paso desde actions user signUpUser

Router.route('/auth/SignIn')
.post(signInUser)

/* Router.route("/auth/signOut")
.post(signOutUser) */

Router.route("/verify/:uniqueString")   //recibe el link del usuario y llama con el get a funcion de verificacion
.get(verifyEmail)   

Router.route("/auth/signInToken")
.get(passport.authenticate("jwt",{session: false}), verificarToken)  //si pasa el autentificador para a verificar el token



module.exports = Router
