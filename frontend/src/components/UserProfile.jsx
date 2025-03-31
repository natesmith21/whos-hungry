import React, {useState, useContext} from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import UserContext from "../UserContext";
import dbApi from "../dbApi";


const UserProfile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {savedRecipes, setSavedRecipes} = useState();

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
        async function getSaved() {
            setSavedRecipes(await dbApi.getSavedRecipes(currentUser.username));
        }
        getSaved()
      }, [currentUser])

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
        <ul>
            {savedRecipes.saved.map(recipe => (
                <li key={recipe.recipeId}>{recipe.recipeId}</li>
            ))}
        </ul>
    </section>
    )
}

export default UserProfile;