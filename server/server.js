const express = require('express')
//bringing express from npm
let app = express();
//instantiating our app by calling express and letting it setup for us

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
//take form post data and turn into object the avaible on request.body

//super special middleware logger
// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next();
// });

// app.use((req, res, next) => {
//     fs.appendFileSync('log.txt',`${req.url}\n`);
//     next();
// });

app.post('/formsubmissions', (req, res) => {
    let object = {
        name: req.body.name,
        email: req.body.email
    }
    fs.readFile('./formsubmissions.json', "utf8", (err, json) => {
        if (err) {
            console.log(err)
        } else {
            const data = JSON.parse(json);
            data.push(object);
            console.log(data);
            fs.writeFileSync('./formsubmissions.json', JSON.stringify(data), (err) => {
                console.log(err);
            });
        }
    });

    // console.log(req.body.email);
    // console.log(req.body.name);
    res.send('Hello from the web server side...');
});

app.use(express.static(path.join(__dirname, '../public')));
//get all from public folder

// app.get('/', (req, res) => {
//     //make request
//     res.sendFile(path.join(__dirname,'../public/index.html'))
//     //respond to request
// });

// app.get('/css/styles.css', (req,res)=>{
//     res.sendFile(path.join(__dirname,'../public/css/styles.css'))
// }) 
// gets specific file

// app.get('/', (req, res) => {
//     //make request
//     res.send('Hello from the web server side...')
//     //respond to request
// });

app.listen(3000);