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

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

mongoose.model('users', userSchema);
mongoose.model('token', tokenSchema);
