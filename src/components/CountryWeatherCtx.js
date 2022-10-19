import React,{useState,useEffect} from "react";

export const countryWeatherCtx = React.createContext();

const CountryWeatherCtx = ({children})=>{
    const [countryWeather,setCountryWeather]= useState(JSON.parse(window.localStorage.getItem("countryWeather"))||null);

    useEffect(()=>{
        window.localStorage.setItem("countryWeather",JSON.stringify(countryWeather));
    },[countryWeather]);
    const value = {
        data: countryWeather,
        setCountryWeather:function(val){setCountryWeather(val)},
        storeLocally:function (){
            window.localStorage.setItem("countryWeather",JSON.stringify(countryWeather));
        },
        get:function(){window.localStorage.getItem("countryWeather")}
    };
    return(
        <countryWeatherCtx.Provider value={value}>
            {children}
        </countryWeatherCtx.Provider>
    );
}
export default CountryWeatherCtx;