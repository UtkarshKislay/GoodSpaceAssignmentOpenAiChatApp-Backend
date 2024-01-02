const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const cors = require('cors');
const userRoute = require('./routes/User');
const openAiRoute = require('./routes/OpenApi');
const bodyParser = require('body-parser');
const databaseConnect = require('./DataBase/DbConnect');
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

databaseConnect();

app.use('/', userRoute);
app.use('/', openAiRoute);



app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
})










