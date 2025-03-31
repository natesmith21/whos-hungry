import React from "react";
import { Route, Routes} from 'react-router-dom';
import Login from "./auth/Login";
import Home from "./Home";
import Register from "./auth/Register";
import UserProfile from "./UserProfile";
import Recipe from "./recipes/Recipe";
import RecipesList from "./recipes/RecipeList";

const NavRoutes = ( { login, register } ) => {

    return (
        <>
        <Routes>
            <Route path ='/' element={<Home />} />
            <Route path ='/login' element={<Login login={login} />} />
            <Route path ='/register' element={<Register register={register} />} />
            <Route path ='/profile' element={<UserProfile />} />
            <Route path ='/recipes' element={<RecipesList />} />
            <Route path ='/recipes/:id' element={<Recipe />} />
        </Routes>
        </>
    )
}

export default NavRoutes;