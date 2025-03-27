import React from "react";
import { Route, Switch} from 'react-router-dom';
import Login from "./auth/Login";
import Home from "./Home";
import Register from "./auth/Register";

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
        </Switch>
    )
}

export default Routes;