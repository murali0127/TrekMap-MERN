const mongoose = require('mongoose');
const { Schema } = mongoose;
const Trekking = require('./trekking');
const plm = require('passport-local-mongoose');
const passportLocalMongoose = plm.default || plm;

const userSchema = new Schema({
      email: {
            type: String,
            required: false,
            sparse: true,
            unique: true
      },
      username: {
            type: String,
            required: false
      },
      treks: {
            type: Schema.Types.ObjectId,
            ref: 'Trekking'
      },
      role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
      },
      googleId: {
            type: String
      },
      githubId: {
            type: String
      },
      avatar: {
            type: String
      },
      displayName: {
            type: String
      }

});

userSchema.plugin(passportLocalMongoose, {
      usernameRequired: false
});

const User = mongoose.model('User', userSchema);
module.exports = User;