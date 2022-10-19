import React,{useState,useEffect, useContext} from "react";
import {countriesWeatherCtx} from "../context/CountriesWeatherCtx";
const updateTimeComponent = (date)=>{
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const AMOrPM= document.getElementById("AM-or-PM");

    hours.innerHTML = `${(date.getHours() < 10)? "0"+date.getHours() : date.getHours()}`;
    minutes.innerHTML = `${(date.getMinutes() < 10)? "0"+date.getMinutes() : date.getMinutes()}`;
    seconds.innerHTML = `${(date.getSeconds() < 10)? "0"+date.getSeconds() : date.getSeconds()}`;
    AMOrPM.innerHTML = `${date.toLocaleTimeString().split(" ")[1]}`;
};

const Time = ()=>{
    const [AM,setAM] = useState(JSON.parse(window.localStorage.getItem("AM")));
    const [PM,setPM] = useState(JSON.parse(window.localStorage.getItem("PM")));
    const countriesWeather = useContext(countriesWeatherCtx);

    useEffect(()=>{
        const lastModifiedAt = JSON.parse(window.localStorage.getItem("lastModifiedAt")) || new Date().getTime();
        const currentTime = new Date();
        const lastAM = JSON.parse(window.localStorage.getItem("AM"));
        const lastPM = JSON.parse(window.localStorage.getItem("PM"));
        const timeDeff = currentTime.getTime() - lastModifiedAt;
        const DayInMilliSecond = 24 * 60 * 60 * 1000;

        /*  here I am check if the defference between currentTime in milliSecond and 
            lastModifiedAt time in milliSecond is equal or less than fixed number of DayInMilliSecond 
            if true it will reset countriesWeather which will make a new requestes for weather data 
            from openWeathermap api and will rerender all componentes inside CountriesWeatherCtx component
        */
        if(timeDeff >= DayInMilliSecond) {
            window.localStorage.setItem("lastModifiedAt",JSON.stringify(new Date().getTime()));
            countriesWeather.resetStore({});
        }

        if(AM !== lastAM) {
            console.log("am");
            window.localStorage.setItem("AM",JSON.stringify(AM));
            window.localStorage.setItem("lastModifiedAt",JSON.stringify(new Date().getTime()));
            countriesWeather.resetStore({});
        }
         
        if(PM !== lastPM) {
            console.log("pm");
            window.localStorage.setItem("PM",JSON.stringify(PM));
            window.localStorage.setItem("lastModifiedAt",JSON.stringify(new Date().getTime()));
            countriesWeather.resetStore({});
        }

        console.log("reset");
    },[AM,PM]);

    setInterval(()=>{
        const d = new Date();
        // const time={   
        //     hours:d.getHours(),
        //     minutes:d.getMinutes(),
        //     seconds:d.getSeconds(),
        //     _AM: d.toLocaleTimeString().split(":")[1] === "AM",
        //     _PM: d.toLocaleTimeString().split(":")[1] === "PM"
        // };

        if(d.toLocaleTimeString().split(" ")[1] === "AM"){
            setAM(true);
            setPM(false);
        }
        else{
            setAM(false);
            setPM(true);
        }

        updateTimeComponent(d);

    },1000);
    return(
        <div className="time fs-4 fs-sm-3 fw-bold ms-auto">
            <span id="hours" className="hours mx-1"></span>:
            <span id="minutes" className="minutes mx-1"></span>:
            <span id="seconds" className="seconds mx-1"></span>
            <span id="AM-or-PM" className="AM-or-PM mx-1"></span>
        </div>
    );
};
export default Time;