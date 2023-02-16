const http = require('node:http');
const nodeMailer = require('nodemailer');
const {createReadStream} = require('fs')

const htmlBody = createReadStream('./index.html')

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method.toLowerCase() === 'get') {
        res.end('Hello World');
    }
});

// const image = createReadStream('./public/user.png')

const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lillian60@ethereal.email',
        pass: '1UmTNX2hbg4R4T8Xuz'
    }
});

const messageConf = {
    from: "lillian60@ethereal.email",
    to: ['foo@gmail.com', 'bar@gmail.com', 'random@gmail.com'],
    subject: 'Node Mailer Task',
    text: 'Hello World !',
    html: htmlBody,
    attachments: [
        {
            filename: 'user.png',
            path: './public/user.png',
            cid: 'localhost:5000'
        }
    ]
}

transporter.sendMail(messageConf).then((mail) => {
    console.log('mail send', mail)
}).catch(err => {
    console.log(err)
});

server.listen(5000, () => {
    console.log(5000)
});