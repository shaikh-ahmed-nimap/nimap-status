const {app, port} = require('./app')

app.listen(port, () => console.log(`port listening on port ${port}`));