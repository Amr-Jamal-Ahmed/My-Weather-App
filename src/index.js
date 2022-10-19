import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CountriesWeatherCtx from "./context/CountriesWeatherCtx";

ReactDOM.render(
    <CountriesWeatherCtx>
        <App />
    </CountriesWeatherCtx>
    ,document.getElementById("root")
);