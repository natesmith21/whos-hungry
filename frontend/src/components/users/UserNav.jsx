import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../../UserContext";
import './UserNav.css';

const UserNav = () => {

    return (
        <Navbar className="userNav">
            <Nav tabs>
                <NavItem>
                    <NavLink to="">User Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="saved">View Saved</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="edit">Edit Profile</NavLink>
                </NavItem>
            </Nav>

        </Navbar>
    )
}

export default UserNav;