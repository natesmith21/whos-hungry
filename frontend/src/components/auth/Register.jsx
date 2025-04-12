import React, {useState} from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Register = ( {register } ) => {
    const BLANK_FORM = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(BLANK_FORM);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
          ...formData,
          [name]: value
        }));
      };


      const submitLogin = evt => {
        evt.preventDefault();
        register(formData)
        setFormData(BLANK_FORM);
      };

    return (
    <section>
        <h1>Register</h1>
        <Form onSubmit={submitLogin}>
            <FormGroup>
            <Label htmlFor="email">
                    Username
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.username}
                    id="username"
                    name="username"
                    placeholder="username"
                    type="text"
                >
                </Input>
            <Label htmlFor="password">
                    Password
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.password}
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
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
            <Button >Sign Me Up!</Button>
        </Form>
    </section>
    )
}

export default Register;