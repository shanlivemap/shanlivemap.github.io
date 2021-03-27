/* eslint-disable react/react-in-jsx-scope */
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNav from "./Components/SideNav";
import MapView from "./Container/MapView";

function App() {
  return (
    <Router basename={window.location.pathname || ''}>
      <SideNav />
      <Switch>
        <Route exact path= "/">
          <MapView />
        </Route>
        <Route exact path= "/home">
          <MapView />
        </Route>
        <Route path="*"> 404 </Route>
      </Switch>
    </Router>
  );
}

export default App;
