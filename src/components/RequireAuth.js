import { useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Layout from "../pages/Layout";
import Servicios from "../pages/servicios/Servicios";
//import Layout from "../../src/Layout";
//import verifyJWT from "../../server/middleware/verifyJWT";

const RequireAuth = ({ allowedUser }) => {

// let navigate = useNavigate();

// const { auth } = useAuth();
// const location = useLocation();
// console.log(auth);
// console.log(auth.userRole);
// console.log(allowedUser);

return (

allowedUser===2001 ? <Outlet/> : <Navigate to="/login"/>


);
//return true


}


export default RequireAuth;