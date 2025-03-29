import React from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';


const RecipeCard = ({recipe}) => (
        <Card className='RecipeCard'>
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
        </Card>

)

export default RecipeCard;