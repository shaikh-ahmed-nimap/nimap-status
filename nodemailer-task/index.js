const http = require('node:http');
const nodeMailer = require('nodemailer');
const {createReadStream} = require('fs')

const htmlBody = createReadStream('./index.html')

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method.toLowerCase() === 'get') {
        res.end('Hello World');
    }
});

const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aleen54@ethereal.email',
        pass: '7XKgjxPbEtxzRVAWNZ'
    }
});

const messageConf = {
    from: "aleen54@ethereal.email",
    to: ['foo@gmail.com', 'bar@gmail.com', 'random@gmail.com'],
    subject: 'Node Mailer Task',
    text: 'Hello World !',
    html: htmlBody
}

transporter.sendMail(messageConf).then((mail) => {
    console.log('mail send', mail)
}).catch(err => {
    console.log(err)
});

server.listen(5000, () => {
    console.log(5000)
});