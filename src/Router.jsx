import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home'
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Owner from "./pages/Owner";
import Normal from "./pages/Normal";
import Pgroom from "./pages/Pgroom";

const AllRoutes = () =>{
    return(
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Signin/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/student" element={<Student/>}/>
            <Route exact path="/owner" element={<Owner/>}/>
            <Route exact path="/normal" element={<Normal/>}/>
            <Route exact path="/pg" element={<Pgroom/>}/>
        </Routes> 
    )
}

export default AllRoutes;