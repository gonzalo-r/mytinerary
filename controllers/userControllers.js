const User = require("../models/user")
const bcryptjs = require("bcryptjs")

const userControllers = {
    signUpUser: async (req,res) => {
        const {firstName, lastName, email, password, from, country, image}= req.body.data

        try{
             const oldUser = await User.findOne({email})
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
                             image
                        })

                        if(from !== "form-Signup"){
                            await newUser.save()
                            res.json({
                                success:true,
                                from:"signup",
                                message: "Congratulations your user has been created with " + from
                            })
                        } else{
                            await newUser.save()
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
            const {email, password, from} = req.body.logedUser
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
                    if (from === "signUpForm") { //si fue registrado por nuestro formulario
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
                        } else { //si no hay coincidencias
                            res.json({
                                success: false, 
                                from: from,  
                                message: `verify your password!`})
                        }
                    } else { //si fue registrado por redes sociales
                        //ACLARACION: por ahora es igual al anterior
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
                        } else { //si no hay coincidencias
                            res.json({
                                success: false, 
                                from: from,  
                                message: `verify your mail or password!`})
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    from: from,
                    message: 'ERROR'})
            }
        }
    }

module.exports = userControllers

/* SignInUser: async (req, res) =>{
    const {email, password, from}=req.body.logedUser // ver si llega como logedUser o como???
    try{
        const oldUser=await User.findOne({email})
        
        if (!oldUser){
            res.json({
                     success:false,
                     from: "no form"
                     message:"Yu usuario no ha sido registrado, realiza registro"}) //pasarlo a ingles
        }else{
            if(from !== "form-Signup"){
                let passwordOk = oldUser.password.filter(pass=>bcryptjs.compareSync(password, pass)) 
                //comparo si la password es igual al desencriptado de (pass=>bcryptjs.compareSync(password(viene el front), pass(la q esta guardada en la base de datos)))
                if(from=== "from-Signup"){
                    if
                }







                if( passwordOk.length>0){
                    const data ={
                        id: oldUser._id,
                        firstName:  oldUser.firstName,
                        lastName: oldUser.lastName,
                        email:  oldUser.email,
                        from: from,
                    }
                    await oldUser.save()
                    res.json({
                        success:true,
                        from: from,
                        response:{data},
                        message: "Welcome nuevamente" + data.firstName + data.lastName, 
                    } )
                }else{ 
                    res.json({
                        success:false,
                        from: from,
                        message:"Verify your password"
                    })

                }

            }else {}




        }




    } */






