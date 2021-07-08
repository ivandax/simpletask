import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";
import Verify from "PublicViews/Verify";

// state
import { State } from "Store/state";

const PrivateRoute = (): JSX.Element => {
    const loginState = useSelector((state: State) => state.root.userLogin);
    const authenticated = loginState.status === "successful" && loginState.data.token != undefined;
    if (authenticated === false) {
        return <Redirect to="/login" />;
    } else {
        return <Route path="/app" component={(): JSX.Element => <>You are logged in!</>}></Route>;
    }
};

const Root = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/sign-up" component={SignUp}></Route>
                <Route path="/verify" component={Verify}></Route>
                <PrivateRoute />
            </Switch>
        </Router>
    );
};

export default Root;
