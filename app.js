/* Global Variables */
//.......Create API credentials on OpenWeatherMap.com......//
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=3fbb10f254242dbfaf9fa3b47a9e62b4";
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//...................listener to generate button .... ...//
const generatListen=document.getElementById('generate');
generatListen.addEventListener('click',clickAction);
function clickAction(ev){
    let zip=document.getElementById('zip').value;
    let feeling=document.getElementById('feelings').value;
   // console.log(feeling);
    //let temp=document.getElementById('temp').value;
    //temp return from open weather
       getWeather(baseURL, zip, apiKey)
  .then(function(data) {
    console.log(data);
    // try{
    postData('/addWeather', {date:newDate, temp:data.main.temp, content:feeling}) 
  // }
  // catch(error){
  //   console.log("errrr" , error)}
    // updateUI();
   .then(() => {updateUI()})
  })
 
}
 
// function to get weather from api

const getWeather = async(baseURL, zip,apiKey) => {
  const res = await fetch(baseURL+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  }catch(error) {
    console.log('error', error);
  }
}

// function to POST data
const postData = async(url='', data={}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)

  })
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
    console.log("response", response);
  }
}

// function to GET data and update UI
const updateUI = async() => {
  const request = await fetch('/all');  //put getting data into variable request
  try {
    
    const data = await request.json(); //transform the data to json file and save into data
    //show data to client
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
    document.getElementById('content').innerHTML = `Feelings: ${data.content}`;
    console.log(data);
  } catch(error) {
    console.log('error', error);
    console.log("request", request)
  }
}