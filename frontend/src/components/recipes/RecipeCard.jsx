import React, {useContext, useState, useEffect} from 'react';
import {Card, CardBody, CardTitle, CardText, Button, Container} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserContext from '../../UserContext';
import './recipeCard.css';


const RecipeCard = ({ recipe }) => {
    const {hasSaved, addToSaves, removeFromSaves} = useContext(UserContext);
    const [saved, setSaved] = useState();

    useEffect(function updateSavedStatus() {
        setSaved(hasSaved(recipe.id));
      }, [recipe.id, hasSaved]);

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


    return (
        <Card className='RecipeCard col-md-3'>
            <Link to={`/recipes/${recipe.id}`}>
            <CardBody>
                <CardTitle>
                    {recipe.title}
                </CardTitle>
                <CardText>
                    {recipe.summary}
                </CardText>
            </CardBody>
            </Link>
            <Container>
            <Button
                color='success'
                outline 
                onClick={handleSave}
                disabled={saved}
            >Save Recipe</Button>
            {(saved) &&             
            <Button
                color='danger'
                outline 
                onClick={handleRemove}
                disabled={!saved}
            >Remove Recipe</Button>
            }
            </Container>
        </Card>
        )
}

export default RecipeCard;