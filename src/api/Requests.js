import { Component } from "react";
import Axios from "./Axios";

class Requests extends Component { 
    /**
     * @description - This is function for make request for oneWeatherMap application
     *                to get weather description and temprature
     * @param {Number} zip
    */
    
    static getWeatherData = async ({zip,countryName,coords}) => {
        // fetch openWeatherMap API Data
        if(zip){
            const response = await Axios.get(
                `/weather?zip=${zip},us&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
            );
         
            return response;
        }
        else if(countryName){  
            const response = await Axios.get(
                `/weather?q=${countryName}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
            );

            return response;
        }
        else if(coords){
            const response = await Axios.get(
                `/weather?lat=${coords?.latitude}&lon=${coords?.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
            );
         
            return response;
        }
    };
}

export default Requests;