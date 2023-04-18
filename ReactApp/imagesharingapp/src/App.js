import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import {
    createBrowserRouter, Navigate, Outlet,
    RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import {useContext} from "react";
import {AuthContext} from "./context/authContext";


function App() {
    const {currentUser} = useContext(AuthContext);

    const Layout = () => {
        return (
            <div>
            <Navbar/>
                <div style={{display:"flex"}}>
            <Outlet/>
                </div>
            </div>
        );
    };

    const ProtectedRoute = ({children}) => {
        if(!currentUser){
            return <Navigate to="/login"/>
        }
        return children
    }

    const router = createBrowserRouter([
        {
            path:"/",
            element: (<ProtectedRoute>
                         <Layout/>
                      </ProtectedRoute>),
            children: [
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                }
            ]
        },
        {
            path: "/login",
            element: <Login/>,
        },{
            path: "/register",
            element: <Register/>,
        },
    ]);


  return (
      <div >
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;


