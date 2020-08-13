const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const PackageModel = require('../../model/PackageModel');
const UserModel = require('../../model/UserModel');

 /**
 * @route    POST api/package/create
 * @desc     Create a package
 * @access   Private
 */

router.post('/create', 
    
    [
        authMiddleware,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('type', 'Name is required').not().isEmpty(),
            check('price', 'Name is required').not().isEmpty(),
            check('credit', 'credit is required').not().isEmpty(),
            check('credit', 'credit must at least be 1').isInt({ min: 1})
        ]
    ],

    async (req, res) => {

        // Validate request body
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() });
        }

        try {

            // Check if User is Instructor
            const User = await UserModel.findOne({ _id: req.user.id });

            if(!User.instructor){
                return res.status(400).json({ error: [{ msg: 'User not authorised to add package' }] });
            }

            // check if package already exists
            const packageAlreadyExist = await PackageModel.findOne({ name: req.body.name });

            if(packageAlreadyExist){
                return res.status(400).json({ error: [{ msg: 'Package already exists' }] });
            }
            
            // create package 
            const package = new PackageModel({
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                credit: req.body.credit,
                image: req.body.image
            })

            // save package
            await package.save();

            res.json({ msg: 'package has been created '});

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route    GET api/package/display
 * @desc     Get all package
 * @access   Public
 */

router.get('/display', async (req, res) => {

    try {
        const package = await PackageModel.find();
        res.json(package);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

 /**
 * @route    PUT api/package/update
 * @desc     Update package
 * @access   Private
 */

router.put('/update/:name', [authMiddleware], async (req, res) => {

        // Validate request body
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() });
        }

        try {

            // Check if User is Instructor
            const User = await UserModel.findOne({ _id: req.user.id });

            if(!User.instructor){
                return res.status(400).json({ error: [{ msg: 'User not authorised to add package' }] });
            }

            // Check if package exists
            const package = await PackageModel.findOne({ name: req.params.name });

            if(!package){
                return res.status(404).json({ error: [{ msg: 'Package not found' }] });
            }

            if(req.body.name) package.name = req.body.name;
            if(req.body.type) package.type = req.body.type;
            if(req.body.price) package.price = req.body.price;
            if(req.body.credit) package.credit = req.body.credit;
            if(req.body.image) package.image = req.body.image;

            // Save changes
            package.save();

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route    DELETE api/package/:name
 * @desc     Delete package by name
 * @access   Private
 */

router.delete('/:name', authMiddleware, async (req, res) => {

    try {
        // Check if User is Instructor
        const User = await UserModel.findOne({ _id: req.user.id });

        if(!User.instructor){
            return res.status(400).json({ error: [{ msg: 'User not authorised to add package' }] });
        }

        // Check if package exists
        const package = await PackageModel.findOne({ name: req.params.name });

        if(!package){
            return res.status(404).json({ error: [{ msg: 'Package not found' }] });
        }

        // Delete package by param :name
        await package.remove();
        res.json({ msg: 'Package has been deleted '});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
});

/**
 * @route    POST api/package/user/add
 * @desc     Allow user to add package to their account
 * @access   Private
 */

router.post('/user/add', 
    
    [
        authMiddleware,
        [
            check('PackageName', 'Package Name is required').not().isEmpty(),
            check('type', 'type is required').not().isEmpty(),
            check('classNumber', 'Class number is required').not().isEmpty(),
            check('classNumber', 'Class number must at least be 1').isInt({ min: 1 }),
            check('activation', 'activation is required').not().isEmpty(),
        ]
    ], 
    
    async (req, res) => {

        try {

            // Get user obj
            let user = await UserModel.findById(req.user.id);

            // Build package user want to add 
            const packageToAdd = {
                PackageName: req.body.PackageName,
                type: req.body.type,
                classNumber: req.body.classNumber,
                expiry: null,
                activation: false,
                image: req.body.image
            }

            // Insert Package into user
            user.package.unshift(packageToAdd);

            // Save changes to user obj
            await user.save();

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

/**
 * @route    POST api/package/user/activate/:index
 * @desc     Allow the activation of user package, update package expiry
 * @access   Private
 */

router.post('/user/activate/:index', authMiddleware, async (req, res) => {
        
        try {

            // Get the user obj from DB
            let user = await UserModel.findById(req.user.id);
            
            // construct Update obj
            const updatedPackage = {
                expiry: Date.now,
                activation: true,
                image: req.body.image
            }

            // Package id to activate
            packageID = req.params.index;
            
            //TODO pick user package to activate
            //user.package.map(pkg => )

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
        
    }
);

module.exports = router;