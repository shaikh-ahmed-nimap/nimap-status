const app = require('./app');

const port = 5000
const server = app.listen(port, () => console.log(`server listening on port ${port}`));

module.exports = server;