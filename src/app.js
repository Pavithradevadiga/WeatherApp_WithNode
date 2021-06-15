const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates//partials')
hbs.registerPartials(partialsPath)



app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name: 'Pavithra'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'Weather App',
        name: 'Pavithra'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        help: 'We will get back to you with help',
        title : 'Weather App',
        name: 'Pavithra'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({error:'You must enter an address'})
    }
    
    geocode(req.query.address, (error,{latitude,longitude,location}={}) =>{
        if (error) {
            return res.send({error})
        }
            forecast(latitude,longitude,(error,forecastdata) => {
                if(error){
                    return res.send({error})
                }
                    
                    return res.send({forecast:forecastdata,location,address:req.query.address})
                
            })
        
    })
    /* var address = req.query.address
    res.send({
        address: req.query.address,
        forecast : 'It is snowing',
        location: 'Philadelphia!!'
    }) */
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        help: 'Help article not found',
        title : 'Weather App',
        name: 'Pavithra'
    })
})


app.get('*',(req,res) => {
    res.render('404',{
        help: 'Page not found',
        title : 'Weather App',
        name: 'Pavithra'
    })
})

app.listen(3000,() => {
    console.log(" Am listening at port no 3000")
})