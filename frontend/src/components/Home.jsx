import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import dbApi from "../dbApi";

const Home = () => {
    const [recipe, setRecipe] = useState();

    // useEffect(function randomRecipe() {

    //     async function getRandRecipie() {
    //         try {
    //             let recipie = await spoonApi.getRandom();
    //             setRecipe(recipie);
    //         } catch (e) {
    //             console.error(e)
    //         }
    //     }
    //     getRandRecipie()
    // }, []);

    // console.log(recipe);

    const randRecipe = async () => {
        let res = await dbApi.getRandomRecipe();
        console.log(res);
    }

    const { currentUser } = useContext(UserContext)
    return (
        <>
            <h1>{(currentUser) ? `Welcome back ${currentUser.firstName}!` : `Who's Hungry?`}</h1>
            <button onClick={randRecipe}>Get Random</button>
        </>
    )
}

export default Home;