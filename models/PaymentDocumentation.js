const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentDocumentation = new Schema({
  lobbyistId: { type: String, required: true },
  forYear: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  effectiveDate: { type: Date, required: false },
  status: {
    type: String,
    enum: [
      ' ', // when a lobbyist hasn't submitted any documentation or payments for the year
      'action_needed', // when a lobbyist has submitted documentation but no payments
      'payment_pending', // when a lobbyist has submitted a payment that is not complete
      'paid', // when payment is complete
      'exemption_requested', // when a lobbyist has requested a non-profit exemption
      'exemption_approved', // when a non-profit exemption has been approved
      'exemption_rejected' // when a non-profit exemption has been rejected
    ],
    default: '',
    required: true
  }
});

mongoose.model('payment_documentation', paymentDocumentation);
