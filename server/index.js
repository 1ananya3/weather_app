const express= require('express');
const app = express();
const axios= require('axios');
const cors = require('cors');
require('dotenv').config()
app.use(cors());


PORT=process.env.PORT
app.get('/', (req, res) => {
    res.send('Hello Server!')
}) 
app.get('/api', (req, res) => {
    res.json({message:"Hello from server"})
})       

app.get('/getWeather', async (req,res)=>{ 
    try {
        const city= req.query.city;
        const api_key=process.env.API_KEY
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        const response= await axios.get(url);
        console.log("response", response.data);
        res.status(200).json(response.data)
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({error:"Failed to send the weather data!!"})
    }

})

app.listen(PORT, () => console.log(`Server running on port  ${PORT}`))