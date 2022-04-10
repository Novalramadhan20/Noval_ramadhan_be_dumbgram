
const express = require("express");

// Get routes to the variabel
const router = require('./src/routes/index');

//use express in app variable
const app = express();

//define the server port
const port = 5000;

app.use(express.json());

// Add endpoint grouping and router
app.use('/api/v1/', router);

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));
