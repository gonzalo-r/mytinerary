
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy //requiero 2 constructores(estrategia y extraer) o clases del paq q instalamos
const extractJwt = require('passport-jwt').ExtractJwt 
 
const User = require('../models/user') //importo mi modelo de  usuario

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(), //traigo el metodo BEarer
    secretOrKey: process.env.SECRETKEY
},(jwt_payload,done)=>{      //va a extraer l os datos del  usuario. done es de la libreri passport

    User.findOne({_id:jwt_payload.id})  //va abuscar en la base de dato el id q coincida con el payload(significa q existe)
    
    .then(user => {
        
        if (user) { //si el usuario existe va a pasar hacia el controlador
           
            return done(null, user) //done es un metodo q tiene esos parametros.me va a pasar el error como num y el usuario
        } 
        else if (err) {
         
            return done(err, false);//pasa el error pero no el usuario
        }
        else{
            return done(null, false)//3ra opcion por si pasa al go diferente. hay un tercer caso de dne q es info
        }
    })
    .catch(err => {  //este es el error que nos lleva al 401. Si no exite user
        console.log(err.status)
        return done(err,false)
    })

})) //todo esto avanza al controlador