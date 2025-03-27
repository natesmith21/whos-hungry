import React from "react";
import { Route, Switch} from 'react-router-dom';
import Login from "./Login";
import Home from "./Home";

const Routes = ( { login, register } ) => {

    return (
        <Switch>
            <Route exact path = '/'>
                <Home />
            </Route>
            <Route exact path='/login'>
                <Login login={login}/>
            </Route>
        </Switch>
    )
}

export default Routes;