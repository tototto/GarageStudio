const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const authMiddleware = require('../../middleware/auth');
const UserModel = require('../../model/UserModel');

const router = express.Router();

/**
 * @route    GET api/auth
 * @desc     Return User if he/she is Authenticated
 * @access   Private
 */

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route    POST api/auth/login
 * @desc     Check if user's credential is correct, if so returns Token
 * @access   Public
 */
router.post('/login', 

    [
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
            let userFound = await UserModel.findOne({ email: req.body.email });

            if(!userFound) {
                // If user not found
                return res.status(400).json({ error: [{ msg: 'Invalid credential' }] });
            }

            // Check if user password matches with DB record
            isMatch = await bcrypt.compare(req.body.password, userFound.password);

            if(!isMatch) {
                // If password don't match
                return res.status(400).json({ error: [{ msg: 'Invalid credential' }] });
            }

            // Return Jsonwebtoken for sucessful login 
            const payload = { user: { id: userFound.id } };
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