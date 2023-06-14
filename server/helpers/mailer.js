if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const nodemailer = require("nodemailer");
const { User, Log } = require('../models/index')
async function Mail(email) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cubestrike77@gmail.com',
            pass: process.env.EMAIL
        }
    })

    // send mail with defined transport object
    let detail = {
        from: '"VOCABUILDER" <cubstrike77@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello!, you just login to your account", // Subject line
        text: "Thankyou for trusting us to help improve your progress. Keep the fire up till it's not", // plain text body
        html: "<b>It is you?</b>,<h1>You just to use your cridential and now you can check your progress.</h1><br> if not, your bad. You just lost your account.", // html body
    }

    mailTransporter.sendMail(detail, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('email has been sent')
        }
    })
}

module.exports = Mail