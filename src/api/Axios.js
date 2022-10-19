// import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
// import React from "react";
import axios from "axios";

const Axios = axios.create({
    baseURL : 'https://api.openweathermap.org/data/2.5',
});
export default Axios;
