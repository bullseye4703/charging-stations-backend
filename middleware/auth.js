const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.header('authorization')
    if(!token){
        return res.status(401).json({msg: 'No token provided'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err){
        console.log(err);
        res.status(400).json({msg: 'Token is not valid'})
    }
}