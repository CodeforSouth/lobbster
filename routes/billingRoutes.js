const mongoose = require('mongoose');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const PaymentDocumentation = mongoose.model('payment_documentation');

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    const { token, forYear } = req.body;
    try {
      const charge = await stripe.charges.create({
        amount: 25000,
        currency: 'usd',
        description: `Lobbyist Fee for ${forYear}`,
        source: token.id
      });

      console.log(req.user._id, forYear);
      let documentations = await PaymentDocumentation.find({
        lobbyistId: req.user._id,
        forYear
      }).limit(1);

      let paymentDocumentation = documentations[0];
      paymentDocumentation.amountPaid = 250;
      paymentDocumentation.effectiveDate = new Date();
      paymentDocumentation.status = 'paid';

      paymentDocumentation = await paymentDocumentation.save();

      res.json(paymentDocumentation);
    } catch (error) {
      console.log('Error processing payment.');
    }
  });
};
