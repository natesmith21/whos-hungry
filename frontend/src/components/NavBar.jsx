import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";

const NavBar = ( { logout } ) => {
  const { currentUser } = useContext(UserContext);
    return (
        <div>
        <Navbar expand="md">
          <NavLink className='home' exact to="/">
            Jobly
          </NavLink>
          <Nav className="ml-auto" navbar>
            {(currentUser) ? (
              <>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" activeClassName='none' onClick={logout}>Logout</NavLink>
              </NavItem>
              </>
            ) :
            (
              <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            ) 
            }
          </Nav>
        </Navbar>
      </div>
    );
}

export default NavBar;