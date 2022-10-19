import React,{useState,useEffect} from "react";
import Requests from "../api/Requests";
// Personal API Key for OpenWeatherMap API
const apiKey = "a033ed9581321eb891ae88f2dede5cbe";
// arabic countries for that we want make requests to get their weather information
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + " / " + d.getDate() + " / " + d.getFullYear();

const countries = JSON.parse(window.localStorage.getItem("countries"))||[
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
    'Riyadh',
    'Tripoli',
    'Tunis'
];

export const countriesWeatherCtx = React.createContext();

const CountriesWeatherCtx = ({children})=>{
    const [countriesWeather,setCountriesWeather]= useState(JSON.parse(window.localStorage.getItem("countriesWeather"))||{weather:[],size:0});
    const [makeRequestes,setMakeRequestes]= useState(window.localStorage.getItem("makeRequestes"));
    // const newCountriesWeather = JSON.parse(window.localStorage.getItem("countriesWeather"));
    // if(newCountriesWeather.weather[0].addedByUser){
    //     setTimeout(()=>{
    //         newCountriesWeather.weather[0].addedByUser = false;
    //         window.localStorage.setItem("countriesWeather",JSON.stringify(newCountriesWeather));
    //         console.log("localStorage updated");
    //     },0);
    // }
    useEffect(()=>{
        let countryWeather = {};
        window.localStorage.setItem("countriesWeather",JSON.stringify(countriesWeather));
        // setMakeRequestes(JSON.parse(window.localStorage.getItem("makeRequestes")));
        // console.log("makeRequestes",makeRequestes);
        // if(makeRequestes){
            // const countries = JSON.parse(window.localStorage.getItem("countries"));
            if(countriesWeather.size < countries.length){
                Requests.getWeatherData(apiKey,{countryName:countries[countriesWeather?.size]})
                .then(data=>{
                    if (data.cod === 200) {
                        // console.log("countriesWeatherState",countriesWeather);
                        console.log("dataInWeatherMonitor",data);
                        const { main , weather ,wind } = data;
                        const { temp,temp_max,temp_min,humidity } = main;
                        const {description,icon} = weather[0];
                        const {speed,deg} = wind;
        
                        countryWeather = {
                            countryName: countries[countriesWeather?.size],
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
                        const val = {
                            weather : [...countriesWeather?.weather,countryWeather],
                            size:(countriesWeather.size + 1)
                        }
                        setCountriesWeather(val);
                        // console.log("***********",vals.i,"**********");
                        // console.log("state",countriesWeather);
                    }
                })
                .catch(err=>console.log(err));   
            // }
            // else {
            //     window.localStorage.setItem("countriesWeather",JSON.stringify(countriesWeather));
            // }
        }
    },[countriesWeather,makeRequestes]);
    const value = {
        data : countriesWeather,
        add : function(val){
            window.localStorage.setItem("countries",JSON.stringify([val.countryName,...countries]));
            val = {...val,addedByUser: true};
            setCountriesWeather({weather: [...countriesWeather.weather,val],size: (countriesWeather.size + 1)});
            // window.localStorage.setItem("countriesWeather",JSON.stringify(countriesWeather));
        },
        delete: function(name){ 
            setMakeRequestes(false);
            if(name) {
                let countries = JSON.parse(window.localStorage.getItem("countries"));
                countries = countries.filter((item)=> item !== name);
                window.localStorage.setItem("countries",JSON.stringify(countries));
                const newWeather = countriesWeather.weather.filter((item)=> item.countryName !== name);
                setCountriesWeather({weather: newWeather,size : countriesWeather.size - 1});
            }
            else {
                let countries = JSON.parse(window.localStorage.getItem("countries"));
                countries = countries.shift();
                window.localStorage.setItem("countries",JSON.stringify(countries));
                const newWeather = countriesWeather.weather.shift();
                setCountriesWeather({weather: newWeather,size : countriesWeather.size - 1});
            }
        },
        reset : function(){ 
            window.localStorage.setItem("countriesWeather",JSON.stringify(null));
            setCountriesWeather({weather:[],size:0});
        },
        setMakeRequestes : function(val) { 
            // setMakeRequestes(val)
            window.localStorage.setItem("makeRequestes",JSON.stringify(false));
        },
    };
    console.log("value",value);

    return(
        <countriesWeatherCtx.Provider value={value}>
            {children}
        </countriesWeatherCtx.Provider>
    );
};

export default CountriesWeatherCtx;