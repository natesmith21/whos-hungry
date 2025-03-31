import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../UserContext";
import dbApi from "../dbApi";
import SearchBar from './SearchBar';

const Home = () => {
    const navigate = useNavigate();
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

    const search = async (q) => {
        let results = await dbApi.searchRecipes(q);
        // console.log(results);

        navigate("/recipes", {state: {results}});
    }

    const randRecipe = async () => {
        let res = await dbApi.getRandomRecipe();
        console.log(res);
    }

    const { currentUser } = useContext(UserContext)
    return (
        <>
            <h1>{(currentUser) ? `Welcome back ${currentUser.firstName}!` : `Who's Hungry?`}</h1>
            <SearchBar searchFor={search} />
            <button onClick={randRecipe}>Get Random</button>
        </>
    )
}

export default Home;