import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Weather = () =>{
    const[city,setcity]=useState("")
    const[weather,setweather]=useState("")
    const[temp,settemp]=useState("")
    const[desc,setdesc]=useState("")
    const[country,setcountry]=useState("")
  
  const getBackground = () => {
  if (!weather) {
    return { type: "image", src: "/seasons.jpg" }; 
  }

   else if (weather === "Rain") {
    return { type: "video", src: "/rain.mp4" };
  }
  else if (weather === "Clouds") {
    return { type: "video", src: "/cloud.mp4" };
  }
  else if (weather === "Sunny" || weather === "Clear") {
    return { type: "video", src: "/sunny.mp4" };
  }
  else if (weather.includes("Snow")) {
    return { type: "video", src: "/snow.mp4" };
  }
  if (weather.includes("Drizzle")) {
    return { type: "video", src: "/drizzle.mp4" };
  }
  if (weather.includes("Thunderstorm")) {
    return { type: "video", src: "/thunderstorm.mp4" };
  }
  return { type: "image", src: "/seasons.jpg" }; 
};

const getEmoji=(weather)=>{
 
  if(weather==="Rain"){
    return"🌧️"
  }
  else if(weather==="Clouds"){
    return"☁️"
  }
  else if(weather==="Clear"){
    return"☀️"
  }
  else if (weather === "Thunderstorm") {
    return "⛈️";
  } else if (weather === "Mist" || weather === "Fog") {
    return "🌫️";
  } 
}
    const handleCity=(e)=>{
         setcity(e.target.value)
         if (e.target.value=== "") {
    setweather("");
    setdesc("");
    settemp("");
    setcountry("");
  }
    }
    const getWeather=()=>{
      const weatherData=axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1fee3451ccbb5ea580217b20c2b6b0cb`)
      weatherData.then(function(success){
        console.log(success.data)
        setweather(success.data.weather[0].main)
        setdesc(success.data.weather[0].description)
        settemp(success.data.main.temp)
        setcountry(success.data.sys.country)})}
        const background = getBackground();

  return (
    <div className='relative min-h-screen flex items-center justify-center text-white'>
      {getBackground().type==="video"?(
        <video key={background.src}autoPlay loop muted playsInline className='absolute top-0 left-0 w-full h-full object-cover -z-10'>
          <source src={getBackground().src} type="video/mp4"/>
        </video>):(
    <div style={{
        backgroundImage: `url(${getBackground().src})`,
         backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding:'40px'
        
      }} className="absolute top-0 left-0 w-full h-full -z-10"
      />)}
           <div className='text-center w-[350px] p-6  text-white rounded-lg shadow-2xl shadow-blue-400 font-serif bg-gradient-to-r from-[rgba(59,130,246,0.8)] to-[rgba(139,92,246,0.8)]' >
            <h1 className='font-bold text-2xl bg-gradient-to-r from-amber-600  via-red-500 to-yellow-500 bg-clip-text text-transparent'>Weather Report</h1>
            <p className='bg-gradient-to-r from-red-600 via-rose-400 to-pink-400 font-semibold bg-clip-text text-transparent'>I can give you a weather report about your city!</p>
            <input onChange={handleCity} placeholder='Enter your City Name' className='p-2 mt-2  border border-blue-600 bg-gradient-to-r from-red-800 to-rose-300 bg-clip-text text-transparent '/><br/>
            <button className='p-2 mt-4 bg-blue-400  bg-gradient-to-r from-green-600 via-teal-500 to-green-500 text-purple-800' onClick={getWeather}>Get Report</button>
            <div className='text-left mt-4'>
            <h3 className='font-semibold text-xl p-1 flex gap-1 bg-gradient-to-r from-purple-900 to-rose-600 bg-clip-text text-transparent'>Weather:<p className='text-md font-normal text-red-500 italic'>{getEmoji(weather)}{weather}</p></h3> 
             <h3 className='font-semibold text-xl p-1 flex gap-1 bg-gradient-to-r from-purple-900 to-rose-600 bg-clip-text text-transparent'>Temperature:<p className='text-md font-normal text-red-500 italic'>{temp}</p></h3>
              <h3 className='font-semibold text-xl p-1 flex gap-1 bg-gradient-to-r from-purple-900 to-rose-600 bg-clip-text text-transparent'>Description:<p className='text-md font-normal text-red-500 italic'>{desc}</p></h3>
<h3 className='font-semibold text-xl p-1 flex gap-1  bg-gradient-to-r from-purple-900 to-rose-600 bg-clip-text text-transparent'>Country:<p className='text-md font-normal text-red-500 italic'>

  {country ? (
  <img src={`https://flagcdn.com/48x36/${country.toLowerCase()}.png`} alt="flag" className='inline-block w-6 h-4 ml-2' />
) : null}

  {country}</p></h3></div>
           </div>
          
    </div>
  )}

export default Weather