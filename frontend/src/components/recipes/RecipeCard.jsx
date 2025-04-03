import React, {useContext, useState, useEffect} from 'react';
import {Card, CardBody, CardTitle, CardText, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserContext from '../../UserContext';
import './recipeCard.css';


const RecipeCard = ({ recipe }) => {
    const {hasSaved, addToSaves} = useContext(UserContext);
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
            <Button 
                onClick={handleSave}
                disabled={saved}
            >Save Recipe</Button>
        </Card>
        )
}

export default RecipeCard;