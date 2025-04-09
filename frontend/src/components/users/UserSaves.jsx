import React, {useState, useEffect, useContext} from "react";
import RecipeCard from "../recipes/RecipeCard";
import { Container } from "reactstrap";
import UserContext from "../../UserContext";
import LoadingPage from "../LoadingPage";
import dbApi from "../../dbApi";

const UserSaves = () => {
    const [savedRecipes, setSavedRecipes] = useState();
    const [userLoaded, setUserLoaded] = useState();
    const { currentUser } = useContext(UserContext);


      useEffect(() => {
        const getSaved = async () => {
            const userRecipes = await dbApi.getSavedRecipes(currentUser.username);
            setSavedRecipes(userRecipes.recipesInfo);
            setUserLoaded(true);
        }
        getSaved()
      }, [currentUser])

      if (!userLoaded) return <LoadingPage />;

    return (
        <>
                <h3>Saved Recipes</h3>
        <Container fluid="md" className="recipe-container">
            {savedRecipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </Container>
        </>
    )
}

export default UserSaves;