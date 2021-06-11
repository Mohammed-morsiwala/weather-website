//load require library for the projects
// const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app  = express()

//Define paths in express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//for setup handlbars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicPath));

//setting port for production
const port = process.env.PORT || 3000;

app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather App',
        body:'Weather Body'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Us',
        body:'Hey there My Name is mohammed!!!'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This TEXT might help you',
        title:'Ask for help here',
        body:'Free to ask for help here'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You have to provide address"
        })
    }
    // console.log(req.query)
    
    geocode(req.query.address, (error, {lat, long, fullAddress} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(long, lat, (error, {current, location} = {})=>{
                if(error){
                    return res.send({
                        error
                    })
                }

                // console.log("Current Temprature of "+ fullAddress +" :"+ current.temperature);
                res.send({
                    address: fullAddress,
                    forecast:"Current Temprature of "+ fullAddress +" :"+ current.temperature,
                    location
                })
            })
            
        })

})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title:'404',
        errorText: '404 Page Not Found',
        body:'Mohammed'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title:'404',
        errorText: '404 Page Not Found',
        body:'Mohammed'
    })
})



app.listen(port , ()=>{
    console.log("server is up at " + port);
})

