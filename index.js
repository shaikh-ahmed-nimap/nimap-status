import Redis from 'redis';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())

const client = Redis.createClient();

client.connect();

client.on('connect', (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('client connected')
})

app.get('/photos', async (req, res) => {
    try {
        console.log(req.url)
        let data;
        const cachedData = await client.get('photos');
        if (!cachedData) {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const data = await response.json();
            await client.SETEX('photos', 3600, JSON.stringify(data));
            return res.status(200).json({source: 'api', data})
        };
        console.log("end of redis get");
        return res.status(200).json({source: 'cached', data: JSON.parse(cachedData)})
    } catch (e) {
        console.log(e);
        return res.send('error')
    }

})

app.listen(5000, () => {
    console.log('server listening 5000');
})

