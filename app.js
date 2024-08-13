const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bp = require('body-parser');
const axios = require('axios');

let app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended:false}));

// Configure the session middleware
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } 
}));

// Initialize connect-flash middleware
app.use(flash());

// Home route to display the activity
app.get('/', (req, res) => {
    res.render('index', { activity: req.flash('activity') });
});

// Post route to fetch random joke
app.post('/p', async (req, res) => {
    const city = req.body.city;
    console.log(city);
    const apiKey = '58f65a12e8e1cff9e10d8f8c704eb093'; 
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Metric`;
   
    try {
        const response = await axios.get(api); // Use the correct variable name
        const weatherData = response.data;
        const temp=weatherData.main.temp;
        const pressure=weatherData.main.pressure;
        console.log(pressure);
        let main=weatherData.weather[0].main;
        let dis=weatherData.weather[0].description;
        let icon=weatherData.weather[0].icon;
       
        const iconurl=`http://openweathermap.org/img/wn/${icon}.png`;
        res.render('final' ,{city:city,main:main,discription:dis,icon:iconurl,temp:temp,pres:pressure});
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }




});

// Start the server
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
