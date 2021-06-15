const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0a95e88900b434d60e8fd6bd7af48469&query="+latitude+","+longitude+"&units=f";
    request({url,json:true},(error,{body}) => {
        if (error){
            callback('Unable to connect to weather service!')
        } else if(body.error){
            callback('Unable to find the specified location')
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const weatherDescription = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(null,`Currently the temperature is ${temp} but feels like ${feelslike} and the humidity is ${humidity}... you can expect ${weatherDescription}`)
        }
    })
}

module.exports = forecast