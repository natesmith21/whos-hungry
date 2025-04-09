import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../../UserContext";
import UserNav from "./UserNav";


const UserProfile = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
        <h1>User Profile: {currentUser.firstName}</h1>
        <UserNav />
        <section>
            <Outlet />
        </section>
        </>
    )
}

export default UserProfile;