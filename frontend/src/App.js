import "./App.css";
import ReactDOM from "react-dom";
import Dashboard from "./Components/DashBoard/Dashboard";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Registration/Login";
import Signup from "./Components/Registration/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/dashboard"><Dashboard/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/signup"><Signup /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
