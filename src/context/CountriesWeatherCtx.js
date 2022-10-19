import React,{ useContext,useEffect } from "react";
const updateStateWhen = ["addNewItem","deleteItem","updateBroadCast","storeAllItems","resetStore"];
class BroadCast {
    data = {};
    newChannel = function(newData){
        this.data = newData;
    };
}
class ContextConf {
    childrenStates = [];
    broadCast = new BroadCast();
    updateBroadCast = function(newData){
        this.broadCast.newChannel(newData);
        if(this.childrenStates.length !== 0){
            this.childrenStates.forEach(childState=>{
                console.log("state",childState.state,"updateWhen",childState.updateWhen);
                if(childState.updateWhen && childState.updateWhen[updateStateWhen[2]]){

                    childState.setState(newData);
                }
            });
        }
    };
    getAllItems = ()=>{
        const curStoreValue = JSON.parse(window.localStorage.getItem("countriesWeather"))||[];
        return curStoreValue;
    };

    numOfItemInStore = Object.values(this.getAllItems())?.length||0;

    addNewItem = function (data){
        const curStoreValue = JSON.parse(window.localStorage.getItem("countriesWeather"))||[];
        window.localStorage.setItem("countriesWeather",JSON.stringify({...curStoreValue,[`${data.countryName}`]:data}));
        console.log("localStore after added new item",JSON.parse(window.localStorage.getItem("countriesWeather")));
        if(this.childrenStates.length !== 0){
            this.childrenStates.forEach(childState=>{
                if(childState.updateWhen && childState.updateWhen[updateStateWhen[0]]){
                    childState.setState(data);
                }
            });
        }
        this.numOfItemInStore++;  
    };
    deleteItemByKeyName = function(keyName){
        const lastStoreValue = JSON.parse(window.localStorage.getItem("countriesWeather"))||[];
        const newStoreValue = Object.values(lastStoreValue)?.filter(item => item.countryName !== keyName);
        window.localStorage.setItem("countriesWeather",JSON.stringify(newStoreValue));
        if(this.childrenStates.length !== 0){
            this.childrenStates.forEach(childState=>{
                if(childState.updateWhen && childState.updateWhen[updateStateWhen[1]]){
                    childState.setState(newStoreValue);
                }
            });
        }
        this.numOfItemInStore--;
        return newStoreValue;
    };
    getItemByKeyName = (keyName)=>{
        const curStoreValue = JSON.parse(window.localStorage.getItem("countriesWeather"))||[];
        return curStoreValue[keyName];
    };
    storeAllItems = function(allData){
        window.localStorage.setItem("countriesWeather",JSON.stringify(allData));
        if(this.childrenStates.length !== 0){
            this.childrenStates.forEach(childState=>{
                if(childState.updateWhen && childState.updateWhen[updateStateWhen[3]]){
                    childState.setState(allData);
                }
            });
        }
        this.numOfItemInStore = Object.values(allData)?.length;
    };
    resetStore = (replaceWithValue)=>{
        window.localStorage.setItem("countriesWeather",JSON.stringify(replaceWithValue));
        if(this.childrenStates.length !== 0){
            this.childrenStates.forEach(childState=>{
                if(childState.updateWhen && childState.updateWhen[updateStateWhen[4]]){
                    childState.setState(replaceWithValue);
                }
            });
        }
        this.numOfItemInStore = 0;
    };
}
const contextConf = new ContextConf();
console.log("contextconf",contextConf);
export const countriesWeatherCtx = React.createContext();

// export const useCountriesWeatherCtx = ()=>{
//     return useContext(countriesWeatherCtx);
// };

const CountriesWeatherCtx = ({children})=>{
    return(
        <countriesWeatherCtx.Provider value={contextConf}>
            {children}
        </countriesWeatherCtx.Provider>
    );
};

export default CountriesWeatherCtx;