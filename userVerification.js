const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  verifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserVerification', userVerificationSchema);
