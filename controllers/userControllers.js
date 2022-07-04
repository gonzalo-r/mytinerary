const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto")
const nodemailer = require("nodemailer")
const {google}= require("googleapis")
const OAuth2 = google.auth.OAuth2;


 const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
        )
        myOAuth2Client.setCredentials({
            refresh_token:process.env.GOOGLE_REFRESHTOKEN
            });
    
            const accessToken = myOAuth2Client.getAccessToken() 




    const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
        service: "gmail",
        auth: {
          user:  process.env.USER,    //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
          type: "OAuth2",
          user: process.env.USER,
          clientId: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_CLIENTSECRET,
          refreshToken: process.env.GOOGLE_REFRESHTOKEN,
          accessToken: accessToken                        //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
        },
        tls: {
            rejectUnauthorized: false
          }                                            //CONFIGURACIONES DE GMAIL
    })

    // EN ESTA SECCION LOS PARAMETROS DEL MAIL 
      
    let mailOptions = { 
        from: process.env.USER,    //DE QUIEN
        to: email,       //A QUIEN
        subject: "Verify account ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <div >
        <h1 style="color:red">Presiona <a href=http://localhost:4000/api/verify/${uniqueString}>aqui</a> para confirma tu email. Gracias </h1>
        </div>
        `
    
    };
   
    transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
        if (error) { console.log(error) }
        else {
            console.log("Mensaje enviado")

        }
    })
};
 




const userControllers = {
    signUpUser: async (req,res) => {
        const {firstName, lastName, email, password, from, country, image, uniqueString,
            verification}= req.body.data

        try{
             const oldUser = await User.findOne({email})
             const verification = false
             const uniqueString = crypto.randomBytes(15).toString("hex")
             if(oldUser) {
                          if(oldUser.from.indexOf(from) !== -1) {
                          res.json({
                                     success: false,
                                    from: "signup",
                                     message: "You have already done the signup in this way, please do the signin"
                                   })
                          } else {
                         const hashword = bcryptjs.hashSync(password, 10) 
                         oldUser.from.push(from)
                         oldUser.password.push(hashword)
                         oldUser.verification = true
                         res.json({
                         success:true,
                         from:"signup",
                         message: "We add " + from + " to your means to perform the signin"                        
                                 })
                         }

             } else {
                        const hashword = bcryptjs.hashSync(password, 10) 
                        const newUser = await new User({
                             firstName,
                             lastName,
                             email,
                             password: [hashword],
                             from: [from],
                             country,
                             image,
                             uniqueString,
                             verification

                        })

                        if(from !== "form-Signup"){
                            newUser.verification = true
                            await newUser.save()
                            res.json({
                                success:true,
                                from:"signup", 
                                message: "Congratulations your user has been created with " + from
                            })
                        } else{
                            await newUser.save()
                            await sendEmail(email, uniqueString)
                            res.json({
                                success:true,
                                from:"signup",
                                message: "We send an email to validate it" 
                            })
                        }
                    }
            } catch (error){
                res.json({success:false , message:"An error has occurred, please try again later"})
            }
        },


    signInUser: async (req, res) => {
            //console.log('REQ BODY SIGN IN USER')
            //console.log(req.body)
            const {email, password, from} = req.body.dataSingin
            try {
                const oldUser = await User.findOne({email}) //buscamos por email
                if (!oldUser) { //si NO existe el usuario
                    res.json({
                        success: false,
                        from: 'no from',
                        message: `${email} has no account, please SIGN UP!`
                    })
                } else { //si existe el usuario
                    let checkedWord =  oldUser.password.filter(pass => bcryptjs.compareSync(password, pass))
                    //console.log(checkedWord)
                    //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
                    if (from === "form-Signup") { //si fue registrado por nuestro formulario
                        if (checkedWord.length>0) { //si hay coincidencias
                            const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                                id: oldUser._id,
                                email: oldUser.email,
                                firstName: oldUser.firstName,
                                image: oldUser.image,
                            
                                from: oldUser.from}
                            await oldUser.save()
                            res.json({
                                response: userData, 
                                success: true, 
                                from: from, 
                                message: `welcome back ${userData.firstName}!`})
                        }  else { //si no hay coincidencias
                            res.json({
                                success: false, 
                                from: from,  
                                message:  `verify your email or password!`})
                        } 
                    } else { //si fue registrado por redes sociales
                        
                        if (checkedWord.length>0) { //si hay coincidencias
                            const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                                id: oldUser._id,
                                email: oldUser.email,
                                firstName: oldUser.firstName,
                                image: oldUser.image,
                                from: oldUser.from}
                            await oldUser.save()
                            const token = jwt.sign({...userData},process.env.SECRETKEY,{expiresIn:60*60*24}) //guardo en el local
                            res.json({
                                response:{token,  userData }, 
                                success: true, 
                                from: from, 
                                message: `welcome back ${userData.firstName}!`})
                        } else { //si no hay coincidencias
                            res.json({
                                success: false, 
                                from: from,  
                                message: `verify your mail or password!`})
                        }
                    }
                } //return res
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    from: from,
                    message: 'ERROR'})
            }
        },

        verificarToken:(req, res) => {
       
     
            if(req.user){ //el user es el parametro q viene de passport
            res.json({success:true,
                      response:{
                          id:req.user.id,
                          firstName: req.user.firstName,
                         email:req.user.email, 
                         from:"token",
                         image: req.user.image},
                      message:"Welcome again "+req.user.firstName
                    }) 
            }else{
                res.json({success:false,
                message:"Please do again signIn"}) 
            } //de aca todo vuelve al actions
        },

        signOutUser: async (req, res) => {
       
            const email = req.body.closeuser
            const user = await User.findOne({ email })
            
            user.isConected = false
            await user.save()
            
            res.json({success:true})
        },

        verifyEmail: async (req, res) => {

            const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK
    
            const user = await User.findOne({ uniqueString: uniqueString})
            //console.log(user) //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
            if (user) {
                user.verification = true //COLOCA EL CAMPO emailVerified en true
                await user.save()
                res.redirect("http://localhost:3000/auth/SignIn") //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
                //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
            }
            else { res.json({ success: false, response: "Su email no se ha verificado" }) }
        },
     
    }

module.exports = userControllers

