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
  isAdmin: { type: Boolean, required: true }
}, {
  runSettersOnQuery: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

mongoose.model('users', userSchema);
