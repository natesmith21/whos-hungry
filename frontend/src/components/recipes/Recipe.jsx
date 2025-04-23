import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import dbApi from "../../dbApi";
import { cleanHTML } from '../../helper_funcs';
import UserContext from "../../UserContext";
import { Container, Row, Col, Button } from "reactstrap";
import SignInModal from "../users/SignInModal";


const Recipe = () => {
    const { id } = useParams();
    const { currentUser, hasSaved, addToSaves, removeFromSaves } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);
    const [saved, setSaved] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    if (currentUser) {
        useEffect(() => {
            async function getRecipe() {
                setRecipe(await dbApi.getRecipe(id));
            }
            getRecipe()
            setSaved(hasSaved(+id));
        }, [id]);
    
    } else {
        useEffect(() => {
            async function getRecipe() {
                setRecipe(await dbApi.getRecipe(id));
            }
            getRecipe()
        }, [id]);
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (hasSaved(recipe.id)) return;

        addToSaves(recipe.id, recipe.title);
        setSaved(true);
    }

    const handleRemove = async (e) => {
        e.preventDefault();
        if (!hasSaved(recipe.id)) return;

        removeFromSaves(recipe.id);
        setSaved(false);

    }

    const showPopUp = async (e) => {
        e.preventDefault();
        toggle()
    }


    if (!recipe) return (
        <div className="LoadingSpinner">
        Loading ...
        </div>
    )

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
                    <ol>
                        {recipe.analyzedInstructions[0].steps.map(step => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>
                </Col>

            </Row>
            {(saved) ?            
            <Button
                color='danger'
                outline 
                onClick={(currentUser) ? handleRemove : showPopUp}
                disabled={!saved}
            >Remove Recipe</Button> :
            <Button
            color='success'
            outline 
            onClick={(currentUser) ? handleSave : showPopUp}
            disabled={saved}
        >Save Recipe</Button>
            }
        
        <SignInModal modal={modal} toggle={toggle} />
        </Container>
    )


}

export default Recipe;


