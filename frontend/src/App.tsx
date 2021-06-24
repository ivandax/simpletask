import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import { customTheme } from "Styles/theme";

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

function App(): JSX.Element {
    return (
        <div className="App">
            <ThemeProvider theme={customTheme}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/sign-up" component={SignUp}></Route>
                        <PrivateRoute />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
