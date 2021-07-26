import React, { useState, useEffect } from 'react'
import { Container, Form, Table, FormControl,Button } from 'react-bootstrap';

function ManageExchange() {

    const [exchanges, setExchanges] = useState([]);

    const [exchangeName, setexchangeName] = useState('');
    const [exchangeBrief, setexchangeBrief] = useState('');
    const [exchangeAdd, setexchangeAdd] = useState('');
    const [exchangeRemarks, setexchangeRemarks] = useState('');

    async function loadData() {
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/getStockExchanges', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            }
        });
        return res.json();
    }

    async function AddExchange() {
        const dataModel = {
            "name": exchangeName,
            "brief": exchangeBrief,
            "address": exchangeAdd,
            "remarks": exchangeRemarks
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/addStockExchange', {
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

    function clearFields() {
        setexchangeName(''); setexchangeAdd(''); setexchangeBrief(''); setexchangeRemarks('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!exchangeName || !exchangeAdd || !exchangeBrief || !exchangeRemarks) {
            alert('Please fill the details')
            return
        }

        AddExchange().then((data) => {
            console.log(data);
            loadData().then((data) => {
                setExchanges(data)
            });
        });
        clearFields();
    }

    useEffect(() => {
        loadData().then((data) => {
            setExchanges(data)
        });
    }, []);

    const [toggleAdd, setToggleAdd] = useState(true);

    return (
        <div>
            <br></br>
            <div>
                <Container>
                    <center>
                        <h3>Stock Exchange List</h3>
                        <Table striped bordered hover size="md" >
                            <thead >
                                <tr >
                                    <td>Id</td>
                                    <td>Exchange Name</td>
                                    <td>Exchange Brief</td>
                                    <td>Exchange Address</td>
                                    <td>Exchange Remarks</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    exchanges.map(exchange =>
                                        <tr key={exchange.id}>
                                            <td>{exchange.id}</td>
                                            <td>{exchange.name}</td>
                                            <td>{exchange.brief}</td>
                                            <td>{exchange.address}</td>
                                            <td>{exchange.remarks}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </center>
                </Container>
                <br /><br />

            </div>

            <div>
                <Container><h3>Add Stock Exchange</h3></Container>
                <Container style={{ borderRadius: '8px', padding: '16px', border: '4px solid lightgrey' }}>
                    {toggleAdd ?
                        <div>
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exchange Name</Form.Label>
                                    <FormControl
                                        aria-label="exchange name"
                                        aria-describedby="basic-addon1"
                                        value={exchangeName}
                                        onChange={(e) => setexchangeName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exchange Brief</Form.Label>
                                    <FormControl
                                        aria-label="exchange brief"
                                        aria-describedby="basic-addon1"
                                        value={exchangeBrief}
                                        onChange={(e) => setexchangeBrief(e.target.value)}
                                    />
                                    </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exchange Address</Form.Label>
                                    <FormControl
                                        aria-label="exchange address"
                                        aria-describedby="basic-addon1"
                                        value={exchangeAdd}
                                        onChange={(e) => setexchangeAdd(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Exchange Remarks</Form.Label>
                                    <FormControl
                                        aria-label="exchange brief"
                                        aria-describedby="basic-addon1"
                                        value={exchangeRemarks}
                                        onChange={(e) => setexchangeRemarks(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Button type='submit'>Add Exchange</Button>
                            </Form>
                        </div>
                        : ''}
                </Container>
                <br></br>
            </div>
        </div>
    )
}

export default ManageExchange
