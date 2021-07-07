import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";

const PrivateRoute = (): JSX.Element => {
    const authenticated = false;
    if (authenticated === false) {
        return <Redirect to="/login" />;
    } else {
        return <Route path="/" component={(): JSX.Element => <>Home</>}></Route>;
    }
};

const Root = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/sign-up" component={SignUp}></Route>
                <Route path="/verify">
                    <div>hello world</div>
                </Route>
                <PrivateRoute />
            </Switch>
        </Router>
    );
};

export default Root;
