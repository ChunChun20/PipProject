import {createContext, useState,useEffect} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );


    const login = () => {
        //to do
        setCurrentUser({
            id:1,
            name:"Johny sins",
            profilePic:
                "https://pbs.twimg.com/profile_images/1356982518495510533/M4-B3M0c_400x400.jpg"
        });
    };

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser,login}}>
            {children}
        </AuthContext.Provider>
    );
}