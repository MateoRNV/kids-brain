var crypto = require('crypto');
const {signupTemplate} = require('./email-templates/signup');
const { sendEmail } = require('./email');
const app = require('../app');

function sendEmailVarification(email, ip){
    var md5sum = crypto.createHash('md5').update(email).digest('hex');

    console.log('------- IP: '+ ip);
    sendEmail({
        from: 'noreplay@braingym.com',
        to: email,
        subject: 'Your registration is completed',
        html : signupTemplate(`${ip}/varify-email?appcode=${md5sum}`)  // DEV locally
        // html : signupTemplate(`http://18.116.197.6/varify-email?appcode=${md5sum}`)  // Deployment on aws
    })
}

module.exports = {
    sendEmailVarification
}