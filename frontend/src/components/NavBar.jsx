import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";
import './NavBar.css';

const NavBar = ( { logout } ) => {
  const { currentUser } = useContext(UserContext);
    return (
        <>
        <Navbar expand="md">
          <NavLink className='home' to="/">
            Who's Hungry?
          </NavLink>
          <Nav className="ml-auto" navbar>
            {(currentUser) ? (
              <>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" onClick={logout}>Logout</NavLink>
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
      </>
    );
}

export default NavBar;