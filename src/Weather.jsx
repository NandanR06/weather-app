import React, { useEffect, useReducer, useRef, useState } from 'react'
import './weather.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import humidity from './assets/humidity.png'
import wind_speed from './assets/wind.png'
import axios from 'axios';

export default function Weather() {
    const inputData = useRef();
    const dataDay = new Date();
    const date = dataDay.toDateString()

    const [weatherdata, setWeatherdata] = useState({});
    const search = (city) => {
        if (city === "") {
            alert("Please enter the city");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        axios.get(url)
            .then((data) => {
                console.log(data);
                setWeatherdata({
                    humidity: data.data.main.humidity,
                    wind_speed: data.data.wind.speed,
                    temperature: Math.floor(data.data.main.temp),
                    city: data.data.name,
                    logoImg: data.data.weather[0].icon
                })
                
            })
            .catch((error) => {
                console.log("error")
                if (!error.ok) {
                    alert(`city not found`)
                    return;
                }
            });
    }

    useEffect(() => {
        search("bengaluru");
    },[]);

    return (
        <div>
            <div className='weather' >

                <div className='search-bar'>
                    <input ref={inputData} type="text" placeholder='Search' />
                    <i onClick={() => { search(inputData.current.value) }} className="bi bi-search"></i>
                </div>

                {weatherdata ? <>
                    <img src={`https://openweathermap.org/img/wn/${weatherdata.logoImg}@2x.png`} className='weather-icon' />
                    <p className='temperature'>{weatherdata.temperature}°C</p>
                    <p className='Location'>{weatherdata.city}</p>
                    <div className='date'>{date}</div>
                    <div className="weather-data">
                        <div className="col-1">
                            <img src={humidity} alt="humidity" className='humidity' />
                            <div className='humidity-value'>
                                <p>{weatherdata.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col-2">
                            <img src={wind_speed} alt="wind_speed" className='wind-speed' />
                            <div className='wind-value'>
                                <p>{weatherdata.wind_speed} km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                    </div>
                </> : <></>}
            </div>
        </div>
    )
}
