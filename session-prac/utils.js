const nodeMailer = require('nodemailer');

function createValidationError(errors=[]) {
    const errObj = errors.map(error => ({[error.param]: error.msg}))
    return errObj;
}

const sendMail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: "nodemailer reset password <nodemailer@mail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail send');
        return true;
    } catch (e) {
        console.log('got error while sending male', e);
        return false;
    }
}

module.exports = {createValidationError, sendMail};