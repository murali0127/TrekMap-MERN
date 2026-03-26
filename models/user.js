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
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
      },
      username: {
            type: String,
            required: false,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username cannot exceed 30 characters']
      },
      treks: [{
            type: Schema.Types.ObjectId,
            ref: 'Trekking'
      }],
      role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
      },
      googleId: {
            type: String,
            sparse: true
      },
      githubId: {
            type: String,
            sparse: true
      },
      avatar: {
            type: String,
            default: ''
      },
      avatarPublicId: {
            type: String
      },
      displayName: {
            type: String,
            trim: true
      },
      bio: {
            type: String,
            maxlength: [500, 'Bio cannot exceed 500 characters']
      },
      location: {
            type: String,
            trim: true
      },
      website: {
            type: String,
            trim: true
      },
      socialLinks: {
            twitter: { type: String, trim: true },
            instagram: { type: String, trim: true },

      },
      stats: {
            treksCreated: { type: Number, default: 0 },
            reviewsWritten: { type: Number, default: 0 },

      },
      createdAt: {
            type: Date,
            default: Date.now
      },
      lastActive: {
            type: Date
      }
});

userSchema.plugin(passportLocalMongoose, {
      usernameRequired: false
});

// Index for faster profile lookups
userSchema.index({ username: 1 });

// Virtual for profile URL
userSchema.virtual('profileUrl').get(function () {
      return `/user/profile/${this._id}`;
});

// Method to update last active timestamp
userSchema.methods.updateLastActive = function () {
      this.lastActive = Date.now();
      return this.save();
};

// Method to calculate profile completeness percentage
userSchema.methods.getProfileCompleteness = function () {
      let fields = 0;
      let filled = 0;

      // Check each profile field
      if (this.avatar) filled++;
      fields++;
      if (this.displayName) filled++;
      fields++;
      if (this.bio) filled++;
      fields++;
      if (this.location) filled++;
      fields++;
      if (this.website) filled++;
      fields++;
      if (this.email) filled++;
      fields++;

      return Math.round((filled / fields) * 100);
};

const User = mongoose.model('User', userSchema);
module.exports = User;