require('dotenv').config();
const User = require('./models/User');
const express = require('express');
const {mySqlConnect} = require('./config');

const userRouter = require('./routers/userRoutes')

const app = express();
app.use(express.json());
// app.get('/api/user', async (req, res) => {
//     try {
//         const user = await User.findAll();
//         return res.status(200).json(user)
//     } catch (err) {
//         res.send('something went wrong')
//     }
// }) 
app.use('/api/users', userRouter);
const PORT = 5000;

app.listen(PORT, () => {
    mySqlConnect();
    console.log(`server listening on port ${PORT}`)
});