import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import dbApi from "../../dbApi";
import SearchBar from "../SearchBar";
import RecipeCard from "./RecipeCard";
import UserContext from "../../UserContext";

const RecipesList = () => {
    const location = useLocation();
    const { currentUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState();
    const [term, setTerm] = useState();

    // console.log(setSearchTerm);
    // is there a better way to do this search? should I clear location.state once I'm done with it? does it need to be in the dep. array for the useEffect?
    if (location.state) {
        useEffect(() => {
            setRecipes(location.state.results.recipes);
        }, [location.state]);
        // window.history.replaceState({}, '');
    }

    const search = async (q, offset=0) => {
        setTerm(q)
        let rec = await dbApi.searchRecipes(q, {offset});
        setRecipes(rec.recipes);
    }

    // const next = async (q, offset=0) => {
    //     search(term, recipes.number);
    // }

    if (!recipes) return (
        <section>
            <SearchBar searchFor={search} />
        </section>
    )

    return (
        <section>
            <SearchBar searchFor={search} />
            <div className="col-md-10 offset-md-1" >
            {recipes.results.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
            {(recipes.totalResults > (recipes.number + recipes.offset)) && <button >Next</button> }
        </section>
    )
    
}

export default RecipesList;