import React ,{useContext} from "react";
import { lastActiveEle } from "./LastActiveEleCtx";
import Requests from "../api/Requests";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + " / " + d.getDate() + " / " + d.getFullYear();
// coords for store user coordsinates
let coords = null;

function rotateRectToMinus90Deg(e) {
    e.stopPropagation();
  
    document.getElementById(`rectangle`).classList.remove("rotateY-0-deg");
    document.getElementById(`rectangle`).classList.add("rotateY-minus-90-deg");
}

/**
 * @description - This is function used for print error zip code message
 */
function showErrorMessage(message) {
  const generateBtn = document.getElementById("generate");
  const messageBox = document.getElementById("messageBox");

  generateBtn.classList.remove("loading");
  generateBtn.innerHTML = "Search";
  messageBox.classList.add("show");
  messageBox.innerHTML = `${message}`;
}

/**
 * @description - This is function used for remove error zip code message
 */
function hideErrorMessage() {
  const messageBox = document.getElementById("messageBox");
  const generateBtn = document.getElementById("generate");

  generateBtn.classList.remove("loading");
  generateBtn.innerHTML = "Search";
  messageBox.innerHTML="";
  messageBox.classList.remove("show");
}

const getUserGeolocation = ()=>{
    function successCbFunc(geolocation){
        console.log("coords",geolocation);
        coords = geolocation.coords;
    }
    function errorCbFunc(err){console.log(err);}

    navigator.geolocation.getCurrentPosition(successCbFunc, errorCbFunc);
}

const handleOnChange= (e,lastActiveEleCtx)=>{
      
    if(e.currentTarget.id !== lastActiveEleCtx.lastActiveEle && 
        lastActiveEleCtx.lastActiveEle
    ) {
        const targetEle = document.getElementById(`${lastActiveEleCtx.lastActiveEle}`);
        if(targetEle.tagName !== "BUTTON"){
            targetEle.value= "";
        }
        else{
            targetEle.classList.remove("active");
            coords = null;
        }
    }
    lastActiveEleCtx.setLastActiveEle(e.currentTarget.id);
    hideErrorMessage();
}

const handleOnClick= (e,lastActiveEleCtx)=>{
    e.stopPropagation();
    e.currentTarget.classList.toggle("active");
    if(lastActiveEleCtx.lastActiveEle){
        document.getElementById(`${lastActiveEleCtx.lastActiveEle}`).value= "";
    }
    lastActiveEleCtx.setLastActiveEle(e.currentTarget.id);
    hideErrorMessage();
    getUserGeolocation();
}

function onFormSubmit (e,setFetchedData) {
    e.preventDefault();
    e.stopPropagation();

    // const messageBox = document.getElementById("messageBox");
    const generateBtn = document.getElementById("generate");
    const countryName = document.getElementById("countryName").value; 
    const zip = document.getElementById("zip").value;
    let allData = {};

    if (zip||countryName||coords) {
        generateBtn.classList.add("loading");
        generateBtn.innerHTML = "Loading...";
 
        Requests.getWeatherData({zip,countryName,coords})
        .then((res) => {
            // console.log("done",data);
            if (res.status === 200) {
                const { main , weather ,wind,name } = res.data;
                const { temp,temp_max,temp_min,humidity } = main;
                const {description,icon} = weather[0];
                const {speed,deg} = wind;
                
                allData = {
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
                    date: newDate
                };
                // console.log("allDataObj",allData);
                setFetchedData(allData);

                /*this is line for rotate cube to -90deg two view the other side of it 
                which have print data to user
                */
                rotateRectToMinus90Deg(e);

                /*here in this line i remove loading class 
                and reset innerHTML to default value
                when request done and get response 
                */
                generateBtn.classList.remove("loading");
                generateBtn.innerHTML = "Search";
                document.getElementById("coords").classList.remove("active");
                coords = null;

            } else {
                // start codeing for print error zip code message to user
                showErrorMessage("Invalid Zip Code or country name");
            }
        })
        .catch((err) => {
            console.log(err);
            generateBtn.classList.remove("loading");
            generateBtn.innerHTML = "Search";
            showErrorMessage("Invalid Zip Code or country name");
            // generateBtn.classList.add("error");
        });
    }
    else {
        showErrorMessage("you have not defined the way you want search by");
    }
}

const RectFrontFace = ({setFetchedData})=> {
    const lastActiveEleCtx = useContext(lastActiveEle);
   
    return(
        <div className="rectangle-face front-face">
            <div className="wrapper pt-3 px-3">
                <button onClick={rotateRectToMinus90Deg} type="button" className="arrow right-arrow primary-color" data-target="rectangle">
                    <i className="fa-solid fa-angles-right"></i>
                </button>
                <h2 className="title fs-4 mt-3 mb-1">Search For a Weather<br/>By</h2>
                <form onSubmit={(e)=>onFormSubmit(e,setFetchedData)} className="w-100 h-100 d-flex flex-column justify-content-center align-items-center" action="">
                    <div className="inputs-holder w-100 d-flex flex-column py-3 ps-2 mb-3">
                        <input
                            onChange={e=>handleOnChange(e,lastActiveEleCtx)}
                            id="zip"
                            className="zip w-100 h-100 px-2 text-center"
                            name="zip"
                            type="text"
                            placeholder="Enter country zip code here"
                            autoComplete="off"
                            // value={(()=> {if(currentActiveEle !== lastActiveEle) return"";})()}
                        />
                        <span className="or d-block position-relative primary-color">OR</span>
                        <input
                            onChange={e=>handleOnChange(e,lastActiveEleCtx)}
                            id="countryName"
                            className="countryName w-100 h-100 px-2 text-center"
                            name="countryName"
                            type="text"
                            placeholder="Enter country name here"
                            autoComplete="off"
                        />
                        <span className="or d-block position-relative primary-color">OR</span>
                        <button onClick={(e)=>handleOnClick(e,lastActiveEleCtx)} type="button" id="coords" className="coords w-100 h-100 px-2 d-block position-relative text-center" name="coords">
                            Search by my coordinates
                        </button>
                    </div>
                    <div id="messageBox" className="message-box w-100 px-2 d-flex align-items-center text-center fs-6 overflow-hidden text-capitalize"></div>
                    <button id="generate" className="generate w-100 mt-auto" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RectFrontFace;