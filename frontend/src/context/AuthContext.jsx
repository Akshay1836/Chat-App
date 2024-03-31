import { createContext, useContext, useState } from "react";

export const useAuthContext=()=>{
        return useContext(AuthContext);
}

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
        const [authUser,setAuthuser]=useState(JSON.parse(localStorage.getItem('chat-user')) || null)
        return(
                <AuthContext.Provider value={{authUser,setAuthuser}}>
                        {children}
                </AuthContext.Provider>
        )
}

