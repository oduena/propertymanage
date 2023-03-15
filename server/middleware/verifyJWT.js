const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    //console.log(req.headers['authorization'])
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({error: "hay un error en la validacion del token"});
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        //'b830c6dd3c076155818a6161ec2b2fbf521ccac778337d5d723750f58ae4acbb263fc4126f821e580f26d123bd9f77f72c6710e74cbba7514ff42cc5a5e6e318',
        'e002631dd4993b1e76cf9f697ac1d5ebb9bfb46e229c2a6ec7fe886bcb2d8af9',
        (err, decoded)=>{
            //console.log(err);
            if(err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
          
            next();
        }
    )
}

module.exports = verifyJWT