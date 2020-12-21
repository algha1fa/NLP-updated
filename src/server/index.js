var path = require('path')
const express = require('express')
const testmockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
var body = []
var k = process.env.API_KEY

//require('dotenv').config({ path: __dirname + '/.env' })

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

// console.log(hostname);
// console.log(database);
// console.log(port);


const app = express()

app.use(express.static('dist'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)
console.log(`Your API key is ${process.env.API_KEY}`);
const cors = require('cors');
app.use(cors());

var https = require('follow-redirects').https;
var fs = require('fs');


app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')


})

app.post('/test', async function(req, response) {
    //console.log("REAAAAAAAAAAAAAAAA")
    //mockAPIResponse()
    let str = req.body.formText;
    st1 = encodeURI(str)
    console.log(st1)
    test = "https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${st1}&model=general&lang=en"
    console.log(test)
    const res = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${st1}&model=general&lang=en`)
    try{
        const analysis =  await res.json();
        console.log(analysis)
        response.send(analysis)
    }catch(error){
        console.log('error', error);
    }
})

//function mockAPIResponse() {


//}