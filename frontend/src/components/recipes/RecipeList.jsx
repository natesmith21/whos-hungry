import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import dbApi from "../../dbApi";
import SearchBar from "../SearchBar";
import RecipeCard from "./RecipeCard";
import UserContext from "../../UserContext";
import './recipeList.css';
import { Container, Button } from "reactstrap";
import { cuiseneTypes } from "../../helper_funcs";

const RecipesList = () => {
    const location = useLocation();
    const { currentUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState();
    const [term, setTerm] = useState();

    // console.log(location.state.results.recipes);
    // is there a better way to do this search? should I clear location.state once I'm done with it? does it need to be in the dep. array for the useEffect? -- local storage would be better***
    if (location.state) {
        useEffect(() => {
            setRecipes(location.state.results.recipes);
        }, [location.state]);
        // window.history.replaceState({}, '');
    }

    const search = async (data) => {
        (data.query) && setTerm(data.query); 
        let rec = await dbApi.searchRecipes(data);
        setRecipes(rec.recipes);
    }

    const next = () => {
        search({ query: term,
            offset: (recipes.number + recipes.offset)});
    }

    const browseCuisene = evt => {
        evt.preventDefault();
        search({cuisine: evt.target.id});
    }

    if (!recipes) return (
        <section>
            <SearchBar searchFor={search} />
            <Container fluid="md" className="cuiseneBtnArea">
                {cuiseneTypes.map((c) => (
                    <Button key={c} id={c} className="cuiseneBtn" color="primary" size="sm" outline onClick={browseCuisene}>{c}</Button>
                    ))
                }
            </Container>
        </section>
    )

    return (
        <section>
            <SearchBar searchFor={search} />
            <Container fluid="md" className="recipe-container">
            {recipes.results.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </Container>
            {(recipes.totalResults > (recipes.number + recipes.offset)) && <button onClick={next}>Next</button> }
        </section>
    )
    
}

export default RecipesList;