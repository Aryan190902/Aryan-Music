const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const User = require('../models/Users');
const UpdateData = require('../models/Update');
router.put('/update-role/:id', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        user.role = req.body.role;
        await user.save();

        res.status(200).json({msg: 'User role updated', user});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Server error'});
    }
})

router.get('/users', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.json(users);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/user/:id', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/update-post', authMiddleware, roleMiddleware(['Admin']), async (req, res) => {
    try{
        const { username, mssg } = req.body;

        const newUpdate = new UpdateData({
            username,
            mssg
        });

        await newUpdate.save();
        res.status(200).json({msg: 'Update sent successfully!', item: newUpdate});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error")
    }
})


module.exports = router;