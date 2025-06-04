const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registerUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: 'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user = new User({email,password: hash});
        await user.save();
        const payload = {user: {id:user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token});
    }
    catch (err){
        console.error(err.message);
        res.status(500).json({msg: 'Server error'});
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'User does not exist'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        const payload = {user:{id: user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token});
    }
    catch (err){
        console.error(err.message);
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = {registerUser, loginUser};