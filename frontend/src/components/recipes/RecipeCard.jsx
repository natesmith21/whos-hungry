import React, {useContext, useState, useEffect} from 'react';
import {Card, CardBody, CardTitle, CardText, Button, Container} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import UserContext from '../../UserContext';
import './recipeCard.css';


const RecipeCard = ({ recipe }) => {
    const {hasSaved, addToSaves, removeFromSaves} = useContext(UserContext);
    const [saved, setSaved] = useState();
    const navigate = useNavigate()

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
            <CardBody>
                <CardTitle>
                    {recipe.title}
                </CardTitle>
                <CardText>
                    {recipe.summary}
                </CardText>
            </CardBody>
            <Container className='button-container' fluid="md">
            <Button
                color='primary'
                outline 
                onClick={() => navigate(`${recipe.id}`)}
                // disabled={!saved}
            >Details</Button>
            {(saved) ?            
            <Button
                color='danger'
                outline 
                onClick={handleRemove}
                disabled={!saved}
            >Remove Recipe</Button> :
            <Button
            color='success'
            outline 
            onClick={handleSave}
            disabled={saved}
        >Save Recipe</Button>
            }
            </Container>
        </Card>
        )
}

export default RecipeCard;