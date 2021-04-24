import { React } from "react";

import Login from "./components/Login";
import Admin from "./components/Admin";
import Signup from "./components/Signup";
import Employee from "./components/Employee";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RequireAuth from "./utils/requireAuth";
import AdminOnly from "./utils/AdminOnly";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route
            path="/admin"
            exact
            component={(props) => <AdminOnly Component={Admin} />}
          />
          <Route
            path="/employee"
            exact
            component={(props) => <RequireAuth Component={Employee} />}
          />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
