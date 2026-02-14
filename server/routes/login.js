const express = require('express');
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const adminAuth = require('../middleware/admin-auth.js');
const userAuth = require('../middleware/user-auth.js');

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
};

router.post('/sign-up', async (req, res) => {
    try {
        const { name, email, phonenumber, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            phonenumber,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.ACCESS_TOKEN,
            { expiresIn: '7d' }
        );

        return res.status(201).json({
            message: 'SignUp Successful',
            accessToken: token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

router.post('/log-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }

        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }

        const payload = {
            id: user._id,
            role: user.role,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: '1h',
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: '7d',
        });

        res.cookie('accessToken', accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 3600000,
        });

        res.cookie('refreshToken', refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            message: 'Login successful',
            role: user.role,
            name: user.name,
            accessToken,
            refreshToken,
        });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});




module.exports = router;
