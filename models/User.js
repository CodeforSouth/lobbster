const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  emailVerified: Boolean,
  isAdmin: Boolean
});

mongoose.model('users', userSchema);
