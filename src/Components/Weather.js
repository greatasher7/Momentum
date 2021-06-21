import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faCloud, faSun, faUmbrella, faCloudSun, faMoon, faCloudShowersHeavy, faSnowflake } from '@fortawesome/free-solid-svg-icons'


const Container = styled.section`

`;

const WeatherImg = styled.span`

`;

const Temperature = styled.span`

`;

const City = styled.span`

`;

const Weather = () => {

    const [weatherData, setWeatherData] = useState();

    const getWeather = async () => {
        try{
            const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=b17f3e894d8bf77f4e9b87e1a0ba390f');
            console.log(data);
            setWeatherData(data);
        } catch{

        } finally{

        }
    }

    useEffect(()=>{
        getWeather();
    }, []);

    return(
        <Container>
            <WeatherImg weather={weatherData ? weatherData.weather[0].main : ""}><FontAwesomeIcon icon={faSun} /></WeatherImg>
            <Temperature>{weatherData ? Math.round(Number(weatherData.main.temp)*10)/10 : ""}</Temperature>
            <City>Suwon</City>
            <FontAwesomeIcon icon={faSun}>clear sky</FontAwesomeIcon>
            <FontAwesomeIcon icon={faMoon}>clear sky</FontAwesomeIcon>
            <FontAwesomeIcon icon={faCloudSun}>few clouds</FontAwesomeIcon>
            <FontAwesomeIcon icon={faCloud}>scattered clouds, broken clouds</FontAwesomeIcon>
            <FontAwesomeIcon icon={faCloudShowersHeavy}>shower rain</FontAwesomeIcon>
            <FontAwesomeIcon icon={faUmbrella}>rain</FontAwesomeIcon>
            <FontAwesomeIcon icon={faBolt}>thunderstorm</FontAwesomeIcon>
            <FontAwesomeIcon icon={faSnowflake}>snow</FontAwesomeIcon>
        </Container>
    );
}

export default Weather;