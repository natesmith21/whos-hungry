import React, { useContext } from "react";
import UserContext from "../UserContext";

const Home = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <>
            <h1>{(currentUser) ? `Welcome back ${currentUser.firstName}!` : `Who's Hungry?`}</h1>
        </>
    )
}

export default Home;