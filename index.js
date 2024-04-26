const express = require("express");
const bodyParse = require("body-parser");
const routes = require("./controller/users");
const cors = require('cors');


require('dotenv').config();


const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/astra',routes);
app.listen(port,()=>{
    console.log(`Listening Port: ${port}`)
})