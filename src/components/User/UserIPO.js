import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, Row, Col, Table, Container } from 'react-bootstrap';
import { loadDataApi } from '../EndPoints/Commons';

function UserIPO() {

    const [ipos, setipos] = useState([]);
    const [companyName, setcompanyName] = useState('');

    async function GetIPO(comp) {
        const res = await fetch(`https://stockoneapp-boot.herokuapp.com/getIPOByCompanyName?companyName=${comp}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization":window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!e) {
            alert("EMpty Field");
            return;
        }
        GetIPO(companyName).then((data) => {
            setipos(data);
        });
    }
    useEffect(() => {
        loadDataApi('https://stockoneapp-boot.herokuapp.com/getIPOs').then((data) => {
            setipos(data)
        });
    }, []);
    return (
        <div>
            <br></br>
            <div>
                <center>
                    <h3>IPO's List</h3>
                    <Container>
                    <Form onSubmit={onSubmit} style={{ width: '20%' }}>
                        <Row >
                            <Col xs="9">
                                <input
                                    placeholder="Company Name"
                                    value={companyName}
                                    onChange={(e) => {
                                        setcompanyName(e.target.value)
                                        console.log(e.target.value);
                                        if (e.target.value === "") {
                                            console.log("hello")
                                            loadDataApi('https://stockoneapp-boot.herokuapp.com/getIPOs').then((data) => {
                                                setipos(data)
                                            });
                                        }
                                    }} />
                            </Col>
                            <Col xs="1">
                                <Button type="submit" size="sm"> Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    </Container>
                </center>
                <br />
            </div>
            <Container>
                <Table striped bordered hover size="md">
                    <thead >
                        <tr >
                            <th>Id</th>
                            <th>Company Name</th>
                            <th>Price Per Share</th>
                            <th>Total Shares</th>
                            <th>Open Date Time</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ipos.map(ipo =>
                                <tr key={ipo.id}>
                                    <td>{ipo.id}</td>
                                    <td>{ipo.companyName}</td>
                                    <td>{ipo.pricePerShare}</td>
                                    <td>{ipo.totalNumberOfShares}</td>
                                    <td>{ipo.openDateTime}</td>
                                    <td>{ipo.remarks}</td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
            <br />
            <center>
                <Button onClick={() => {
                    loadDataApi('https://stockoneapp-boot.herokuapp.com/getIPOChronologically').then((data) => {
                        setipos(data)
                    });
                }} variant="success">Show IPO Chronologically</Button>
            </center>

        </div>
    )
}

export default UserIPO
