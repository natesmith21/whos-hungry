import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import dbApi from "../../dbApi";
import { cleanHTML } from '../../utils';
import UserContext from "../../UserContext";
import { Container, Row, Col } from "reactstrap";


const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        async function getRecipe() {
            setRecipe(await dbApi.getRecipe(id));
        }
        getRecipe()
    }, [id]);

    const save = async (e) => {
        e.preventDefault();
        const user = currentUser.username;
        const recipeToSave = recipe.id;
        let recipeFolder;
        
        let recipes = await dbApi.saveRecipe(recipeToSave, {username : user, recipeId : recipeToSave, recipeTitle: recipe.title, recipeFolder});
        console.log(recipes);
    }


    if (!recipe) return (
        <div className="LoadingSpinner">
        Loading ...
        </div>
    )

    // console.log(recipe.analyzedInstructions[0].steps);

    return (
        <Container>
            <h1>{recipe.title}</h1>
            <a href={recipe.sourceUrl}>{recipe.sourceName}</a>
            <p>{cleanHTML(recipe.summary)}</p>
            <hr />
            <Row xs={2}>
                <Col>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.extendedIngredients.map( (ing, idx) => (
                        <li key={idx}>{ing.original}</li>))}
                    </ul>
                </Col>
                <Col>
                    <h3>Instructions</h3>
                    {/* <p>{recipe.instructions}</p> */}
                    <ol>
                        {recipe.analyzedInstructions[0].steps.map(step => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>
                </Col>

            </Row>
            <button onClick={save}>Save Recipe</button>
        </Container>
    )


}

export default Recipe;


