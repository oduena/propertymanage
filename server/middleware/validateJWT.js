const { verify} = require('jsonwebtoken');

const validateJWT = (req, res, next)=>{
    //console.log(req);
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.status(400).json({error: "Usuario no autenticado"})

    try {

        const validToken = verify(accessToken,'b830c6dd3c076155818a6161ec2b2fbf521ccac778337d5d723750f58ae4acbb263fc4126f821e580f26d123bd9f77f72c6710e74cbba7514ff42cc5a5e6e318');

        if(validToken){
            req.authenticated = true
            return next();
        }
        
    } catch (err) {
        return res.status(400).json({error: err})
    }

};


module.exports = validateJWT