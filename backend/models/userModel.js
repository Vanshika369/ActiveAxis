const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  birthday: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'default-profile.jpg', // Default profile picture
  },
  bio: {
    type: String,
    maxlength: 150, // Maximum bio length
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving user to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10); // Salt rounds: 10
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Custom method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
