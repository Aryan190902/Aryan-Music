const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobileNo:{
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid mobile number."]
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['Admin', 'Student', 'Guest'],
        default: 'Guest',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;