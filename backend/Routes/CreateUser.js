const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSceret = "60658234199731595550163471109769"
// POST route to create a user
router.post('/createuser', 
    body('email').isEmail().withMessage('Invalid email format'), 
    body('name').isLength({ min: 5 }).withMessage('Name should be at least 5 characters long'), 
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'), 
    async (req, res) => {
        const result = validationResult(req); 
        if (!result.isEmpty()) { 
            return res.status(400).json({ 
                success: false, 
                errors: result.array() 
            });
        }

        console.log("Received body:", req.body); 

        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password , salt);
        try {
            
            const newUser = await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.geolocation || "Unknown location" 
            });

            
            res.json({ success: true, message: "User created successfully", newUser });
        } catch (error) {
            console.log(error);
            res.json({ success: false, error: error.message });
        }
    }
);

router.post('/loginuser',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    async (req, res) => {
        // Validate request body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: result.array()
            });
        }

        console.log("Received body:", req.body);
        const { email, password } = req.body;

        try {
            // Check if the user exists in the database
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ success: false, errors: 'Invalid email or password' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordMatch = await bcrypt.compare(password, userData.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ success: false, errors: 'Invalid email or password' });
            }
            const data = {
                user : {
                    id : userData.id
                }
            }
            const authToken = jwt.sign(data , jwtSceret)
            // If email and password match, send success response
            return res.json({ success: true , authToken : authToken });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, errors: 'Internal server error' });
        }
    }
);

module.exports = router;
