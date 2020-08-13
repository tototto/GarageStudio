const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../../model/UserModel');
const authMiddleware = require('../../middleware/auth');

/**
 * @route    POST api/user/register
 * @desc     Register User
 * @access   Public
 */
router.post('/register', 

    [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],

    async (req, res) => {
        // Validate request body
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() });
        }
        
        try {
            // Check if user already registered
            let userAlreadyExists = await UserModel.findOne({ email: req.body.email });

            if(userAlreadyExists){
                return res.status(400).json({ error: [{ msg: 'User already exists'}] });
            }

            // Create user gravatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            // Create user
            let user = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar,
                instructor: false
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            // Save user
            user  = await user.save();

            // Create Jsonwebtoken for sucessful registration 
            const payload = { user: { id: user.id } };
            jwt.sign(payload, config.get('jwtToken'), {expiresIn: 3600}, (err, token) => {
                if(err) throw err;
                if(token) res.json({ token: token });
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;