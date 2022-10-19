import React from "react";

export const lastActiveEle = React.createContext();

const LastActiveEleCtx = ({children})=> {
    // const setLastActiveEle = ;
    return(
        <lastActiveEle.Provider value={{lastActiveEle:null,setLastActiveEle:function(val){this.lastActiveEle = val}}}>
            {children}
        </lastActiveEle.Provider>
    );
};

export default LastActiveEleCtx;