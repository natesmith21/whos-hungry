import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import UserContext from "../UserContext";
import './NavBar.css';

const NavBar = ( { logout } ) => {
  const { currentUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);



    return (
        <>
        <Navbar expand="lg" className="mainNav">
          <NavbarBrand className="home" href="/">
            Who's Hungry?
          </NavbarBrand>
          <Nav>
            {(currentUser) ? (
              <>
              <NavItem>
                <NavLink to="/recipes">Browse Recipes</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar id="profile">
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/profile">View Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={ logout }>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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



{/* <NavItem>
<NavLink to="/" onClick={logout}>Logout</NavLink>
</NavItem> */}