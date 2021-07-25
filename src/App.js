import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import DashboardUser from './components/DashboardUser';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div >
          <div>
            <Navbar bg="dark"  expand="lg"> 
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand ><NavLink exact to="/" style={{textDecoration:'none',marginLeft:'32px'}}>Stock One</NavLink></Navbar.Brand>
                {/* <NavLink exact to="/">Home</NavLink>&nbsp;&nbsp; */}
                <Nav className="me-auto">
                <Nav.Link href="/login"><NavLink style={{textDecoration:'none',color:'#A9A9A9'}} to="/login">LogIn</NavLink></Nav.Link>
                <Nav.Link href="/signup"><NavLink style={{textDecoration:'none',color:'#A9A9A9'}} to="/signup">SignUp</NavLink></Nav.Link>
                <Nav.Link><NavLink style={{textDecoration:'none',color:'#A9A9A9'}} to={window.sessionStorage["admin"] === "true" ? "/dashboard-admin" : "/dashboard-user"}>DashBoard</NavLink>
                </Nav.Link>
                </Nav>
            </Navbar>
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
