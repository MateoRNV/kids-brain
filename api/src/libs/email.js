var nodemailer = require('nodemailer');
// exports.sendEmail = async options => {
//   const { mailOptions } = options;
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:  {
//       user: 'headhonchostest@gmail.com',
//       pass: 'euclrvkgoetcznji'
//     }
//   });
//   if(!options.from) mailOptions.from = auth.user;
//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (err) {
//     console.log(err);
//   }
//   return false;
// };

async function sendEmail (emailOptions) {
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:  {
          user: 'braingymstagging@gmail.com',
          pass: 'braingym@123'
        }
      });
      try {
        await transporter.sendMail(emailOptions);
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
}

module.exports = {
  sendEmail
}