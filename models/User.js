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
  identityVerified: { type: Boolean, required: true },
  emailVerified: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true }
}, {
  runSettersOnQuery: true
});

mongoose.model('users', userSchema);
