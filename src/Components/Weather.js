import {useState, useEffect} from "react";
import axios from "axios";
import Geocode from "react-geocode";
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

    const [locationData, setLocationData] = useState();
    const [weatherData, setWeatherData] = useState();
    const [regionData, setRegionDate] = useState();

    useEffect(()=>{
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition( ({coords}) => {
                let {latitude, longitude} = coords;
                setLocationData({lat: String(latitude), lon: String(longitude)});
            });
        }
        getLocation();
    }, []);


    useEffect(()=>{
        const getWeather = async () => {
            if(locationData){
                try{
                    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=b17f3e894d8bf77f4e9b87e1a0ba390f`);
                    setWeatherData(data);
                } catch (e){
                    console.log(e)
                }
            }
        }
        getWeather();
    }, [locationData]);


    useEffect(()=> {
        const getRegion = async () => {
            Geocode.setApiKey('AIzaSyCMI38z86E0qDvgH6zo42Txxzzv60YRegY');
            if(locationData){
                try{
                    const {results} = await Geocode.fromLatLng(locationData.lat, locationData.lon);
                    let country, city;
                    for(let i = 0; i< results[0].address_components.length; i++){
                        for(let j = 0; j < results[0].address_components[i].types.length; j++){
                            switch (results[0].address_components[i].types[j]){
                                case "locality":
                                    city = results[0].address_components[i].long_name;
                                    break;
                                case "country":
                                    country = results[0].address_components[i].long_name;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    setRegionDate({
                        city, country
                    })
                } catch (e){
                    console.log(e);
                }
            }
        }
        getRegion();

    }, [locationData]);

    return(
        <Container>
            <WeatherImg weather={weatherData ? weatherData.weather[0].main : ""}><FontAwesomeIcon icon={weatherData ? filterWeather(weatherData.weather[0].main) : faSun} /></WeatherImg>
            <Temperature>{weatherData ? Math.round(Number(weatherData.main.temp)*10)/10 : ""}°</Temperature>
            <City>{regionData ? `${regionData.city}, ${regionData.country}` : ""}</City>
        </Container>
    );
}

export default Weather;