const mongoose = require('mongoose');

const { Schema } = mongoose;

function toLowerCase(v) {
  return v.toLowerCase();
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: {
    type: String,
    required: true,
    lowercase: true,
    set: toLowerCase,
    unique: true
  },
  passwordHash: { type: String, required: true, select: false },
  emailVerified: { type: Boolean, required: true },
  isVerified: { type: Boolean, default: false},
  isAdmin: { type: Boolean, required: true }
}, {
  runSettersOnQuery: true
});

mongoose.model('users', userSchema);
