import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import {
    createBrowserRouter, Navigate, Outlet,
    RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/Home/Home";
import {useContext} from "react";
import {AuthContext} from "./context/authContext";
import { QueryClient, QueryClientProvider} from 'react-query'

import CreatePost from "./Pages/PostCreation/CreatePost";
import OtherUserProfile from "./Pages/Profile/OtherUserProfile";



function App() {
    const {currentUser} = useContext(AuthContext);

    const queryClient = new QueryClient()

    const Layout = () => {
        return (
        <QueryClientProvider client={queryClient}>

            <div>
            <Navbar/>
                <div style={{display:"flex"}}>
            <Outlet/>
                </div>
            </div>
        </QueryClientProvider>
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
                    path:"/profile/:username",
                    element:<OtherUserProfile/>

                },
                {
                    path:"/createPost",
                    element:
                        <QueryClientProvider client={queryClient}>
                        <CreatePost/>
                        </QueryClientProvider>
                },
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


