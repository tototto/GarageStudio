const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const UserModel = require('../../model/UserModel');
const ClassesModel = require('../../model/ClassesModel');

/**
 * @route    POST api/classes
 * @desc     Create classes
 * @access   Private
 */

router.post('/', 

    [
        authMiddleware,
        [
            check('className', 'Class Name is required').not().isEmpty(),
            check('classDesc', 'Class Description is required').not().isEmpty(),
            check('classType', 'Class Type is required').not().isEmpty(),
            check('classSize', 'Class Size is required').isLength({ min: 1 })
        ]
    ], 

    async (req, res) => {

        // Validate request body
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() });
        }

        // Try to Insert class to DB
        try {

            // Check if User is Instructor
            const User = await UserModel.findOne({ _id: req.user.id });

            if(!User.instructor){
                return res.status(400).json({ error: [{ msg: 'User not authorised to add class' }] });
            }

            // Check if class already exists
            const classAlreadyExists = await ClassesModel.findOne({ className: req.body.className });

            if(classAlreadyExists){
                return res.status(400).json({ error: [{ msg: 'Class already exists'}] });
            }

            // Create class
            const classToAdd = new ClassesModel({
                className: req.body.className,
                classDesc: req.body.classDesc,
                classType: req.body.classType,
                classSize: req.body.classSize,
                classImage: req.body.classImage
            })

            // Save class
            await classToAdd.save();

            res.json({ msg: 'Class created sucessfully '});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

    }
);

/**
 * @route    DELETE api/classes/:className
 * @desc     Delete classes
 * @access   Private
 */

router.delete('/:className', authMiddleware, async (req, res) => {

        try {

            // Get Class to delete
            const classToDelete = req.params.className;

            // Check if User is Instructor
            const User = await UserModel.findById(req.user.id);

            if(!User.instructor){
                return res.status(400).json({ error: [{ msg: 'User not authorised to Delete Class' }] });
            }

            ClassesModel.remove( {className: classToDelete }, true);

            res.json({ msg: `${classToDelete} has been deleted`});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

});

 /**
 * @route    PUT api/classes/:className
 * @desc     Update classes
 * @access   Private
 */

router.put('/:className', authMiddleware, async (req, res) => {

        try {
            // Get name of class to update
            const classToUpdate = req.params.className;

            // Check if User is Instructor
            const User = await UserModel.findById(req.user.id);

            if(!User.instructor){
                return res.status(400).json({ error: [{ msg: 'User not authorised to Update Class' }] });
            }

            let classToBeUpdated = ClassesModel.findOne({ className: classToUpdate });

            if(req.body.className) classToBeUpdated.className = req.body.className;
            if(req.body.classDesc) classToBeUpdated.classDesc = req.body.classDesc;
            if(req.body.classType) classToBeUpdated.classType = req.body.classType;
            if(req.body.classSize) classToBeUpdated.classSize = req.body.classSize;
            if(req.body.classImage) classToBeUpdated.classImage = req.body.classImage;

            await (await classToBeUpdated).save();
            res.json({ msg: `${classToUpdate} has been updated`});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }

});

 /**
 * @route    GET api/classes/all
 * @desc     Get all classes
 * @access   Public
 */

router.put('/all', async (req, res) => {
        
        try {
            const classes = await ClassesModel.find();
            res.json(classes);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
});

module.exports = router;