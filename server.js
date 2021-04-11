// Setup empty JS object to act as endpoint for all routes
//const express=document.express();
projectData = {};
//1-.....import epress package.......

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app = express();
 
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

//2-.......import body-parser package....
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

//3-.....import cors....
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//4-.....creating local server....... 
// define port number
const port=8080;
const server=app.listen(port,()=>{
    console.log(`My first client server js ${port}`);
});

// ....... get route......//
 app.get('/all',(req,res)=>{
     res.send(projectData);
     projectData={};

 })

 //...... post route.....//
 app.post('/addWeather',(req,res)=>{
     console.log(req.body);
     let newData={
         date:req.body.date,
         temp:req.body.temp,
         content:req.body.content
     } 
     projectData = newData;
     res.send(projectData);

 })
 