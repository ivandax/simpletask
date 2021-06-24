import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";

const PrivateRoute = () => {
    const authenticated = false;
    if (authenticated === false) {
        return <Redirect to="/login" />;
    } else return <Route path="/" component={() => <>Home</>}></Route>;
};

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/sign-up" component={SignUp}></Route>
                    <PrivateRoute />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
