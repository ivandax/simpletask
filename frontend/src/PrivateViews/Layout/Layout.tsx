import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "PrivateViews/Home";

interface LayoutProps {
    session: string;
}

const Layout = ({ session }: LayoutProps): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/app" render={(): JSX.Element => <Home session={session} />} />
                <Route path="/app/*" exact render={(): JSX.Element => <Redirect to="/app" />} />
            </Switch>
        </Router>
    );
};

export default Layout;
