import React, {useState} from "react";
import { Link, useHistory }from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = ( {login} ) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
          ...formData,
          [name]: value
        }));
      };


      const submitLogin = async evt => {
        evt.preventDefault();
        let res = await login(formData);
        if (res.success) {
            history.push('/');
        } else {
            console.error(res.errors);
        }
      };

    return (
    <section>
        <h1>Login</h1>
        <Form onSubmit={submitLogin}>
            <FormGroup>
            <Label htmlFor="username">
                    Username
                </Label>
                <Input
                    onChange={handleChange}
                    value={formData.username}
                    id="username"
                    name="username"
                    placeholder="placeholder"
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
            </FormGroup>
            <Button >Login</Button>
        </Form>
        <div>Need to Register? <Link to='/register'>Welcome.</Link></div>
    </section>
    )
}

export default Login;