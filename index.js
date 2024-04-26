const express = require("express");
const bodyParse = require("body-parser");
const routes = require("./controller/users");
const cors = require('cors');
const http = require('http');


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

// Create a separate HTTP server listening on port 80
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Connected to host\n');
});

server.listen(80, () => {
    console.log('HTTP server listening on port 80');
});