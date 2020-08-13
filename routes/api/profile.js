const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserModel = require('../../model/UserModel');
const authMiddleware = require('../../middleware/auth');

/**
 * @route    GET api/profile/user
 * @desc     Get All users profile
 * @access   Public
 */

router.get('/user', authMiddleware, async (req, res) => {
    try {
        // Get Profile
        const Profile = await UserModel.findOne({ _id: req.user.id }).select('-password');
        res.json(Profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;