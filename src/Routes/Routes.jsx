import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import CreateNote from "../Pages/Dashboard/Create Note/CreateNote";
import SessionDetail from "../Pages/Home/Study session/SessionDetail";
import PrivateRoute from "./PrivateRoute";
import PersonalNote from "../Pages/Dashboard/Personal Note/PersonalNote";
import StudyMaterial from "../Pages/Dashboard/Study material/StudyMaterial";
import AllUser from "../Pages/Dashboard/All User/AllUser";
import AllMaterials from "../Pages/Dashboard/All Materials/AllMaterials";
import AdminRoute from "./AdminRoute";
import CreateSession from "../Pages/Dashboard/Create study session/CreateSession";
import TutorRoute from "./TutorRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";
import BookedSession from "../Pages/Dashboard/Booked Session/BookedSession";
import UploadMaterial from "../Pages/Dashboard/Upload Material/UploadMaterial";
import ViewStudySession from "../Pages/Dashboard/View All Study Session/ViewStudySession";
import ViewAllNote from "../Pages/Dashboard/View All Note/ViewAllNote";
import AdminAllSession from "../Pages/Dashboard/Admin all study session/AdminAllSession";
import UpdateSession from "../Pages/Dashboard/Update session/UpdateSession";
import AdminDashboard from "../Pages/Dashboard/Admin dashboard/AdminDashboard";
import Error from "../Error Page/Error";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error></Error>,
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
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            }

        ]
    },
    {
        path: "dashboard",
        errorElement: <Error></Error>,
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'createNote',
                element: <CreateNote></CreateNote>
            },
            {
                path: 'bookedSessions',
                element: <BookedSession></BookedSession>
            },
            {
                path: 'personalNote',
                element: <PersonalNote></PersonalNote>
            },
            {
                path: 'studyMaterial',
                element: <StudyMaterial></StudyMaterial>
            },

            // admin routes 

            {
                path: 'allUser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path: 'adminAllSession',
                element: <AdminRoute><AdminAllSession></AdminAllSession></AdminRoute>
            },
            {
                path: 'updateSession',
                element: <AdminRoute><UpdateSession></UpdateSession></AdminRoute>
            },
            {
                path: 'adminDashboard',
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },

            // // tutor routes

            {
                path: 'createSession',
                element: <TutorRoute><CreateSession></CreateSession></TutorRoute>
            },
            {
                path: 'allMaterials',
                element: <AllMaterials></AllMaterials>
            },
            {
                path: 'uploadMaterial',
                element: <UploadMaterial></UploadMaterial>
            },
            {
                path: 'viewAllStudySession',
                element: <TutorRoute><ViewStudySession></ViewStudySession></TutorRoute>
            },
            {
                path: 'viewAllNote',
                element: <ViewAllNote></ViewAllNote>
            },
            {
                path: 'allMaterials',
                element: <AllMaterials></AllMaterials>
            }

        ]
    }
]);
