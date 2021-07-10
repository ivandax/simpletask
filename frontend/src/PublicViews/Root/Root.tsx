import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// public pages
import Login from "PublicViews/Login/";
import SignUp from "PublicViews/SignUp";
import Verify from "PublicViews/Verify";
import RecoverPassword from "PublicViews/RecoverPassword";
// private route
import Layout from "PrivateViews/Layout";

//components
import LoadingOverlay from "Components/LoadingOverlay";

// action
import { validateSession, removeSession } from "./RootReducer";

// state
import { State } from "Store/state";

const Root = (): JSX.Element => {
    const dispatch = useDispatch();
    const { sessionValidation, session } = useSelector((state: State) => state.root);
    useEffect(() => {
        dispatch(validateSession());
    }, []);

    const logoutCallback = (): void => {
        dispatch(removeSession());
    };

    const userIsAuthenticated = session !== null;

    switch (sessionValidation.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
            return <LoadingOverlay />;
        case "successful":
        case "failed":
            return (
                <Router>
                    <Switch>
                        <Route path="/" exact render={(): JSX.Element => <Redirect to="/app" />} />
                        <Route path="/login">
                            <Login userIsAuthenticated={userIsAuthenticated} />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp userIsAuthenticated={userIsAuthenticated} />
                        </Route>
                        <Route path="/verify">
                            <Verify userIsAuthenticated={userIsAuthenticated} />
                        </Route>
                        <Route path="/recover-password">
                            <RecoverPassword userIsAuthenticated={userIsAuthenticated} />
                        </Route>
                        {session !== null ? (
                            <Route
                                path="/app"
                                render={(): JSX.Element => (
                                    <Layout session={session} removeSession={logoutCallback} />
                                )}
                            ></Route>
                        ) : (
                            <Redirect to="/login" />
                        )}
                        <Route component={(): JSX.Element => <div>Page not found</div>} />
                        <Redirect from="*" to="/app" />
                    </Switch>
                </Router>
            );
    }
};

export default Root;
