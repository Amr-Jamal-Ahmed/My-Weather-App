// import axios from "axios";
import React, { useState,useEffect,useContext } from "react";
import CountryWeather from "./CountryWeather";
import Requests from "../api/Requests";
import {countriesWeatherCtx} from "../context/CountriesWeatherCtx";

//get current date
let d = new Date();
let newDate = d.getMonth() + " / " + d.getDate() + " / " + d.getFullYear();
// arabic capitals for that we want make requests to get their weather information
const DEF_MONITORED_COUNTRIES = [
    'Abu Dhabi',
    'Algiers',
    'Amman',
    'Baghdad',
    'Beirut',
    'Cairo',
    'Damascus',
    'Djibouti',
    'Doha',
    'Khartoum',
    'Kuwait City',
    'Manama',
    'Mogadishu',
    'Muscat',
    'Nouakchott',
    'Rabat',
    'Ramallah',
    'Riyadh',
    'Sanaa',
    'Tripoli',
    'Tunis'
];

const WeatherMonitor = ()=>{
    const [countryWeather,setCountryWeather] = useState();
    const countriesWeather = useContext(countriesWeatherCtx);
    
    useEffect(()=>{
        countriesWeather.childrenStates.push({state:countryWeather,setState:setCountryWeather,updateWhen:{"addNewItem":true,"deleteItem":true,"resetStore":true}});
        let size = countriesWeather.numOfItemInStore;

        if(size < DEF_MONITORED_COUNTRIES.length){
            Requests.getWeatherData({countryName:DEF_MONITORED_COUNTRIES[size]})
            .then(res=>{
                if (res.status === 200) {
                    console.log("countriesWeatherState",countriesWeather);

                    const { main , weather , wind , name } = res.data;
                    const { temp,temp_max,temp_min,humidity } = main;
                    const {description,icon} = weather[0];
                    const {speed,deg} = wind;
    
                    const countryWeather = {
                        countryName: (name === "Jerusalem" || name === "Ramallah")?"Al-Quds,Palestine":name,
                        icon: icon,
                        wind:{
                            speed: speed,
                            deg: deg
                        },
                        temp: {
                            minor: temp_min,
                            actual: temp,
                            great: temp_max
                        },
                        humidity: humidity,
                        desc: description,
                        date: newDate,
                        addedByUser: false,
                    };

                    // console.log("***********",vals.i,"**********");
                    // console.log("state",countriesWeather);
                    countriesWeather.addNewItem(countryWeather);
                    size++;
                }
            })
            .catch(err=>console.log(err)); 
        }  
        // console.log("allItmes",countriesWeather.getAllItems());
    },[countryWeather,countriesWeather]);
    const renderAllCards = ()=>{
        let allItems = Object.values(countriesWeather.getAllItems());
        let addNewCard = countriesWeather.broadCast.data.addNewCard||false;
        return allItems.map((item,i)=>{
            if(addNewCard){
                setTimeout(()=>{
                    const newCard = document.querySelector(".weather-monitor .new-card");
                    newCard?.scrollIntoView({smooth:true});
                },0);
            }
            return <CountryWeather key={i} weather={item} newCardClass={(addNewCard && allItems.length-1 === i)?"new-card":""}/>;
        });
    };
    return(        
        <div className="weather-monitor h-100 d-flex align-items-center flex-wrap">
            <div className="h-100 w-100 px-3 pt-3 mb-auto">
                <h2 className="text-capitalize text-center text-lg-start w-100 mb-4 fw-bold">weather monitor</h2>
                <div className="grid-box justify-content-center">
                    {renderAllCards()}
                </div>
            </div>
        </div>
    );
};
export default WeatherMonitor;