import React, { useState } from 'react'
import { Container, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';

function Login(props) {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    async function LoginApi() {
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/authenticate', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": userName, "password": password })
        });
        return res.json();
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!userName || !password) {
            alert('Please fill the details')
            return
        }
        LoginApi().then((data) => {
                if (data.usersApp.confirmed) {
                    window.sessionStorage.setItem("userName", data.usersApp.name);
                    window.sessionStorage.setItem("token", "Bearer " + data.token);
                    if (data.usersApp.admin === true) {
                        window.sessionStorage.setItem("admin", "true");
                        props.history.push('/dashboard-admin');
                    } else {
                        window.sessionStorage.setItem("admin", "false");
                        props.history.push('/dashboard-user')
                    }
                } else if (data.token === "not confirmed") {
                    alert("Confirmation mail is pending in inbox");
                }
            console.log(data);
        }).catch((error)=>{
            <Alert variant="danger">No User Found</Alert>
        });

        setuserName('')
        setpassword('')

    }

    return (
        <div >
            <br></br>
            <Container>
                <h2>Login</h2>
            </Container>
            <Form onSubmit={onSubmit}>
                <Container style={{ borderRadius: '8px', padding: '16px', border: '4px solid lightgrey' }}>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={userName}
                                name='userName'
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </InputGroup>
                        <Form.Text className="text-muted">
                            We donot share your username with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            placeholder="Password"
                            aria-label="Pasword"
                            aria-describedby="basic-addon1"
                            value={password}
                            name='password'
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" value='Login'>
                        Log In
                    </Button>
                    {/* <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        value={userName}
                        name='userName'
                        onChange={(e) => setuserName(e.target.value)}
                    /> */}
                </Container>
                {/* <div >
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div> */}

            </Form>
        </div>
    )
}

export default Login
