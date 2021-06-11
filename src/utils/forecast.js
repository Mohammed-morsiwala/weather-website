const request = require('postman-request');

const forecast = (long, lat, callback)=>{
    const forecastURL = "http://api.weatherstack.com/current?access_key=09de629da618c116690876f8c24ce809&query="+lat+","+long+""
    console.log(forecastURL)
    request({url:forecastURL, json:true}, (error, {body})=>{
        if(error){
            callback("Can't reach to the server due to connection");
        }else if(body.error){
            callback(body.error.info);
        }else{
            const country_info ={
                current:body.current
            }
            callback(undefined, country_info);
        }
    })
}

module.exports = forecast;