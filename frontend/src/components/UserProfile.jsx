import React, {useState, useContext, useEffect} from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import UserContext from "../UserContext";
import dbApi from "../dbApi";
import LoadingPage from '../components/LoadingPage';


const UserProfile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [savedRecipes, setSavedRecipes] = useState();
    const [userLoaded, setUserLoaded] = useState();

    const START_FORM = {
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    };
    const [formData, setFormData] = useState(START_FORM);


    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
          ...formData,
          [name]: value
        }));
      };

      const submitUpdate = evt => {
        evt.preventDefault();
        const {username, ...data} = formData;
        dbApi.updateCurrentUser(username, data) 
      };

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
    <section>
        <h1>Edit Your Profile</h1>
        <Form onSubmit={submitUpdate}>
            <FormGroup>
            <Label htmlFor="email">
                    Username
                </Label>
                <Input
                    // onChange={handleChange}
                    value={formData.username}
                    id="username"
                    name="username"
                    placeholder="username"
                    type="text"
                    readOnly
                >
                </Input>
                <Label htmlFor="firstName">
                    First Name
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.firstName}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                >
                </Input>
                <Label htmlFor="lasntName">
                    First Name
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.lastName}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                >
                </Input>
                <Label htmlFor="email">
                    Email
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.email}
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                >
                </Input>
            </FormGroup>
            <Button >Update</Button>
        </Form>
        <h3>Saved Recipes</h3>
        <ul>
            {savedRecipes.map(recipe => (
                <li key={recipe.recipeId}>{recipe.recipeId}</li>
            ))}
         </ul>
    </section>
    )
}

export default UserProfile;