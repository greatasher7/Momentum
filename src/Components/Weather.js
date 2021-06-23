import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faSun, faUmbrella, faCloudShowersHeavy, faSnowflake } from '@fortawesome/free-solid-svg-icons'


const Container = styled.section`
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    width: 15rem;
    align-content: flex-start;
`;

const WeatherImg = styled.span`
    font-size: 1.2rem;
    width: 12%;
    margin-right: .2rem;
`;

const Temperature = styled.span`
    font-size: 1rem;
    width: 80%;
    display: flex;
    align-items: center;
`;

const City = styled.span`
    width: 100%;
    margin-top: .3rem;
    font-size: .8rem;
`;

const filterWeather = (weather) => {
    switch (weather){
        case "Clear":
            return faSun;
        case "Clouds":
            return faCloud;
        case "Drizzle":
            return faCloudShowersHeavy;
        case "Rain":
            return faUmbrella;
        case "Thunderstorm":
            return faBolt;
        case "Snow":
            return faSnowflake;
        default:
            return "";
    }
};

const Weather = () => {

    const [weatherData, setWeatherData] = useState();
    const [locationData, setLocationData] = useState();

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition( ({coords}) => {
            let {latitude, longitude} = coords;
            setLocationData({lat: String(latitude), lon: String(longitude)});
        });
    }

    const getWeather = async () => {
        if(locationData){
            console.log("true!");
            try{
                const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${"37.2546"}&lon=${"120.4564"}&units=metric&appid=b17f3e894d8bf77f4e9b87e1a0ba390f`);
                setWeatherData(data);
            } catch (e){
                console.log(e)
            }
        }
    }

    useEffect(()=>{
        getLocation();
        getWeather();
    }, []);

    return(
        <Container>
            <WeatherImg weather={weatherData ? weatherData.weather[0].main : ""}><FontAwesomeIcon icon={weatherData ? filterWeather(weatherData.weather[0].main) : ""} /></WeatherImg>
            <Temperature>{weatherData ? Math.round(Number(weatherData.main.temp)*10)/10 : ""}°</Temperature>
            <City>Suwon, Korea</City>
        </Container>
    );
}

export default Weather;