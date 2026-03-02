const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists with given email or username"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie('token', token)

    res.status(201).json({
        message: "User successfully registered.",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username: username }, { email: email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User with given username or email doesn't exists..."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ id: user._id,username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
    res.cookie('token', token)

    res.status(200).json({
        message: "Login successful",

        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function getUserInfoController(req, res){
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
        message: 'retrived user info successfully', 
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = { registerController, loginController, getUserInfoController }