import React, { useState } from 'react'
import { Button, Col, Form, Row,Container } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function SignUp() {

    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [mobnumber, setmobnumber] = useState('')

    const history = useHistory();

    async function SignUpApi() {
        const dataModel = {
            "name": userName,
            "password": password,
            "email": email,
            "mobileNum": mobnumber,
            "admin": false,
            "confirmed": false
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/setuserapi', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataModel)
        });
        return res;
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!userName || !password || !email || !mobnumber) {
            alert('Please fill the details')
            return
        }

        // onAdd({ userName, password, reminder })
        SignUpApi().then((data) => {
            console.log(data);
            history.push("/login");

        });

        setemail('');
        setuserName('');
        setpassword('');
        setmobnumber('');
    }

    return (

        <div>
            <br></br>
            <Container><h2>Register</h2></Container>
            <Container style={{borderRadius: '8px', padding:'16px',border:'4px solid lightgrey'}}>
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Username
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Username Here..." 
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password Here..."
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email Here..." 
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        Mobile Number
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="number" placeholder="Valid Mobile Number Here..." 
                        value={mobnumber}
                        onChange={(e) => setmobnumber(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">  
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Sign Up</Button>
                    </Col>
                </Form.Group>
                {/* <div >
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
                <div >
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div >
                    <label>Email</label>
                    <input
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div >
                    <label>Mobile Number</label>
                    <input
                        type='number'
                        placeholder='Mob Number'
                        value={mobnumber}
                        onChange={(e) => setmobnumber(e.target.value)}
                    />
                </div>
                <input type='submit' value='Login' /> */}
            </Form>
            </Container>
        </div>
    )
}

export default SignUp
