const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
      email: {
            type: String,
            required: true,
            unique: true
      },
      username: {
            type: String,
            required: true
      },
      role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
      }
});

userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model('User', userSchema);
module.exports = User;