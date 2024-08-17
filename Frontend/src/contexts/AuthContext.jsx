import React, {createContext, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isLoggedin, setLoggedin] = useState(false);

    return (
        <AuthContext.Provider value={{isLoggedin,setLoggedin}}>
            {children}
        </AuthContext.Provider>
    )
}