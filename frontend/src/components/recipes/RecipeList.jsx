import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dbApi from "../../dbApi";
import SearchBar from "../SearchBar";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);


    // is there a better way to do this search? should I clear location.state once I'm done with it? does it need to be in the dep. array for the useEffect?
    if (location.state) {
        useEffect(() => {
            setRecipes(location.state.results.recipes.results);
        }, [location.state]);
        // window.history.replaceState({}, '');
    }

    const search = async (q) => {
        let rec = await dbApi.searchRecipes(q);
        setRecipes(rec.recipes.results);
    }

    

    if (!recipes) return (
        <section>
            <SearchBar searchFor={search} />
        </section>
    )

    return (
        <section>
            <SearchBar searchFor={search} />
            <div className="col-md-10 offset-md-1" >
            {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
        </section>
    )
    
}

export default RecipesList;