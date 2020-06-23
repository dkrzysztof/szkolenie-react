import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from "./shared/components/ProtectedRoute";
import AuthView from "./routes/Auth/AuthView/AuthView";
import Login from "./routes/Login";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <ProtectedRoute path="/auth" Component={AuthView} />
                <Route path="/404">404</Route>
                <Redirect to="/404" />
            </Switch>
        </Router>
    );
}

export default App;
