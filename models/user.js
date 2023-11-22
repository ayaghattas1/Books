const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =  mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password : {type: String, required: true},
    lastName : {type: String, required: true},
    firstName : {type: String, required: true},
    role: { type: String,
            enum : ["user","admin"],
    },
})
userSchema.virtual('name').get(function() {
    return this.firstName + ' ' + this.lastName;
  });

  userSchema.methods.toPublic = function() {
    const user = this;
    const userObject = user.toObject();
   
    delete userObject.password;
    userObject.name = `'{user.firstName}' '{user.lastName}'`;
    
    return userObject;
   }

   userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema)