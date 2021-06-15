const request = require('request')

const geocode = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicGF2aXRocmFhYWFhYWFhYWEiLCJhIjoiY2tuOHlxODV1MDhyNDJvbnlzaWR4aW95aSJ9.xgs3PNo1N8Vc4P7LW25GAA&limit=1"

    request( {url,json:true},(error,{body}) => {
        
        if (error) {
            callback('Unable to connect to Weather service')
        } else if(body.features.length == 0){
            callback('Unable to find the location please try with a valid location')
        } else {
            callback(null,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
/* 
 geocode("", (error,{latitude,longitude,location}) =>{
    if (error) {
        console.log(error)
    }else{
        console.log('meow')
       console.log(latitude,longitude,location) 
    }
}) 
 */


module.exports = geocode