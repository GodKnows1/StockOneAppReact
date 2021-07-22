import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import DashboardUser from './components/DashboardUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div >
          <div>&nbsp;&nbsp;
            <NavLink exact to="/">Home</NavLink>&nbsp;&nbsp;
            <NavLink to="/login">LogIn</NavLink>&nbsp;&nbsp;
            <NavLink to="/signup">SignUp</NavLink>&nbsp;&nbsp;
            <NavLink to={window.sessionStorage["admin"]==="true"? "/dashboard-admin":"/dashboard-user"}>DashBoard</NavLink>
          </div>
          <div >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute component={Dashboard} path="/dashboard-admin" exact />
              <PrivateRoute component={DashboardUser} path="/dashboard-user" exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
