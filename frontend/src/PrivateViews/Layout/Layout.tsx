import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// views
import Home from "PrivateViews/Home";

//components
import LoadingOverlay from "Components/LoadingOverlay";

// actions
import { getUserInfo, resetLayoutState } from "./LayoutReducer";

// state
import { State } from "Store/state";
interface LayoutProps {
    session: string;
    removeSession: (session: string) => void;
}

const Layout = ({ session, removeSession }: LayoutProps): JSX.Element => {
    const dispatch = useDispatch();
    const userInfoState = useSelector((state: State) => state.layout.userInfo);

    useEffect(() => {
        dispatch(getUserInfo(session));
        return function onLayoutUnmounts(): void {
            dispatch(resetLayoutState());
        };
    }, []);

    useEffect(() => {
        if (userInfoState.status === "failed") {
            removeSession(session);
        }
    }, [userInfoState.status]);

    switch (userInfoState.status) {
        case "pending":
        case "in-progress":
        case "re-executing":
        case "failed":
            return <LoadingOverlay />;
        case "successful":
            return (
                <Router>
                    <Switch>
                        <Route
                            path="/app"
                            render={(): JSX.Element => (
                                <Home removeSession={removeSession} session={session} />
                            )}
                        />
                        <Route
                            path="/app/*"
                            exact
                            render={(): JSX.Element => <Redirect to="/app" />}
                        />
                    </Switch>
                </Router>
            );
    }
};

export default Layout;
