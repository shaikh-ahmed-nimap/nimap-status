// const express = require('express');
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');

// const app = express();

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'anastacio.erdman24@ethereal.email',
//         pass: 'f89TFUdKJDtvXu6uW5'
//     }
// });

// const mailOptions = {
//     from: 'johndoe@mail.com',
//     to: 'janedoe@mail.com',
//     subject: 'hello there',
//     text: "message send through nodemailer",
//     html: "<h1>A mail from cron app</h1>"
// }

// // cron.schedule('* * * * *', () => {
// //     transporter.sendMail(mailOptions, (err, info) => {
// //         console.log(info.messageId);
// //         if (err) {
// //             console.log(err);
// //         }
// //     });
// // });

// cron.schedule("13 * 9 feb *", () => {
//     console.log('calling from cron job every second')
// })

// app.listen(5000, () => console.log(`server listening on 5000`));

// TASK
const cron = require('node-cron');

const task = cron.schedule("0 0 5 * * *", () => {
    console.log('GOOD MORNING....')
}, {
    scheduled: true,
    timezone: ''
})

task.start();
// task.stop();