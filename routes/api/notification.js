const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserModel = require('../../model/UserModel');
const NotificationModel = require('../../model/NotificationModel');
const authMiddleware = require('../../middleware/auth');
const auth = require('../../middleware/auth');

/**
 * @route    POST api/notification/create
 * @desc     Create Notification
 * @access   Private
 */

router.post('/create', 

    [
        authMiddleware,
        [
            check('notification', 'Notification details is required').not().isEmpty()
        ]
    ], 

    async (req, res) => {

        // Validate request body
        const error = validationResult(req);

        if(!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // Create notification
        try {

            const notification = new NotificationModel({
                user: req.user.id,
                notification: req.body.notification
            });

            await notification.save()

            res.json({ msg: `Notification added to ${notification.user}`});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route    GET api/notification/list
 * @desc     Get all Notification for current user
 * @access   Private
 */

router.get('/list', authMiddleware, async (req, res) => {

        try {
            const notificationList = await NotificationModel.find({ user: req.user.id });
            res.json(notificationList);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;