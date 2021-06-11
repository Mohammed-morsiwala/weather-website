const request = require('postman-request');

const geocode = (address, callback)=>{
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiY29kZXJtZDcyIiwiYSI6ImNrcDk1eHoxcjBoMncydXA3ZmhkZGVtd3AifQ.LNZVKBDzqrOPWxCZh94dNg&limit=1"

    request({url:geocodeURL, json:true}, (error, response)=>{
        if(error){
            callback("PLease check ur connection first!!!", undefined);
        }else if(response.body.features.length == 0){
            callback("Search for valid location!!!", undefined);
        }else{
            
            const cordinates = {
                long : response.body.features[0].center[0],
                lat : response.body.features[0].center[1],
                fullAddress: response.body.features[0].place_name
            };
            callback(error, cordinates);
        }
    })    
}

module.exports = geocode;