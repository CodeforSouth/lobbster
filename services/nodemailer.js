// https://nodemailer.com/smtp/
// https://nodemailer.com/smtp/oauth2/
// send using SMTP
let transporter = nodemailer.createTransport(options[, defaults])
// gmail instead of sendgrid
// from address same as transporter


// Send the email
//             var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
//             var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
//             transporter.sendMail(mailOptions, function (err) {
//                 if (err) { return res.status(500).send({ msg: err.message }); }
//                 res.status(200).send('A verification email has been sent to ' + user.email + '.');
//             });
//         });
//     });
//   });
// };

// log req.body req.body.params

// create token model
