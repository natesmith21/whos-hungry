import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import UserContext from "../UserContext";
import './NavBar.css';

const NavBar = ( { logout } ) => {
  const { currentUser } = useContext(UserContext);
    return (
        <>
        <Navbar expand="lg">
          <NavbarBrand className="home" href="/">
            Who's Hungry?
          </NavbarBrand>
          <Nav className="me-auto" navbar>
            {(currentUser) ? (
              <>
              <NavItem>
                <NavLink to="/recipes">Browse Recipes</NavLink>
              </NavItem>
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