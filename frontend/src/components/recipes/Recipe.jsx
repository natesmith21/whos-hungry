import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import dbApi from "../../dbApi";
import { cleanHTML } from '../../utils';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function getRecipe() {
            setRecipe(await dbApi.getRecipe(id));
        }
        getRecipe()
    }, [id]);

    if (!recipe) return (
        <div className="LoadingSpinner">
        Loading ...
        </div>
    )

    // console.log(recipe.analyzedInstructions[0].steps);

    return (
        <section>
            <h1>{recipe.title}</h1>
            <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
            <p>{cleanHTML(recipe.summary)}</p>
            <hr />
            <h3>Ingredients</h3>
            <ul>
                {recipe.extendedIngredients.map( (ing, idx) => (
                    <li key={idx}>{ing.original}</li>
                ))}
            </ul>
            <hr />
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <ol>
                {recipe.analyzedInstructions[0].steps.map(step => (
                    <li key={step.number}>{step.step}</li>
                ))}
            </ol>
        </section>
    )


}

export default Recipe;


