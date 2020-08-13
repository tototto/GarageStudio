const express = require('express');
const router = express.Router();

/**
 * @route    POST api/booking
 * @desc     Add class booking
 * @access   Public
 */
router.post('/', (req, res) => res.send('booking Route'));

/**
 * @route    POST api/booking/:booking_id/:update
 * @desc     Update class booking
 * @access   Public
 */
router.put('/:booking_id/:update', (req, res) => res.send('booking Route'));

module.exports = router;