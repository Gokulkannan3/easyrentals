import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home'
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Owner from "./pages/Owner";
import Normal from "./pages/Normal";
import Pgroom from "./pages/Pgroom";
import Owneracpt from "./pages/Owneracpt";
import Studacpt from "./pages/Studacpt";
import Normalaccept from "./pages/Normalaccept";
import Pgaccept from "./pages/Pgaccept";

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
            <Route exact path="/owneracceptance" element={<Owneracpt/>}/>
            <Route exact path="/studentaccept" element={<Studacpt/>}/>
            <Route exact path="/normalaccept" element={<Normalaccept/>}/>
            <Route exact path="/pgaccept" element={<Pgaccept/>}/>
        </Routes> 
    )
}

export default AllRoutes;