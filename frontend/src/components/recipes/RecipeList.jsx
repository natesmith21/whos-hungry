import React, { useState } from "react";
import dbApi from "../../dbApi";
import SearchBar from "../SearchBar";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
    const [recipes, setRecipes] = useState([]);
    // console.log(recipes);

    const search = async (q) => {
        let rec = await dbApi.searchRecipes(q);
        // console.log(rec.recipes.results);
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