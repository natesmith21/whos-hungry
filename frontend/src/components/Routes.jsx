import React from "react";
import { Route, Switch} from 'react-router-dom';
import Login from "./auth/Login";
import Home from "./Home";
import Register from "./auth/Register";
import UserProfile from "./UserProfile";
import Recipe from "./recipes/Recipe";
import RecipesList from "./recipes/RecipeList";

const Routes = ( { login, register } ) => {

    return (
        <Switch>
            <Route exact path = '/'>
                <Home />
            </Route>
            <Route exact path='/login'>
                <Login login={login}/>
            </Route>
            <Route exact path = '/register'>
                <Register register={register} />
            </Route>
            <Route exact path='/profile'>
                <UserProfile />
            </Route>
            <Route exact path ='/recipes'>
                <RecipesList />
            </Route>
            <Route exact path='/recipes/:id'>
                <Recipe />
            </Route>
        </Switch>
    )
}

export default Routes;