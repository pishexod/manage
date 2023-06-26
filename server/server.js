require('dotenv').config();

const express = require('express');
let cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const apiRouter = require('./routes');
app.use('/api', apiRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`server started on port : ${process.env.APP_PORT}`)
});