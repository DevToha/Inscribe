import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
// import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import CreateNote from "../Pages/Dashboard/Create Note/CreateNote";
import SessionDetail from "../Pages/Home/Study session/SessionDetail";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/SessionDetail/:_id',
                element: <PrivateRoute><SessionDetail></SessionDetail></PrivateRoute>
            }
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'CreateNote',
                element: <CreateNote></CreateNote>
            }
        ]
    }
]);