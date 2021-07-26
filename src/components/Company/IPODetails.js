import React, { useState, useEffect } from 'react'
import { Table, Container, Form, Button, FormControl } from 'react-bootstrap';
import { loadDataApi } from '../EndPoints/Commons';

function IPODetails() {

    const [ipos, setipos] = useState([]);

    const [id, setid] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [priceperShare, setpriceperShare] = useState(0);
    const [totShares, settotShares] = useState(0);
    const [remarks, setremarks] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');

    const [toggleAdd, settoggleAdd] = useState(true);
    const [update, setUpdate] = useState(false);

    function clearFields() {
        setcompanyName(''); setdate(''); setpriceperShare(''); setremarks(''); settotShares('');
    }

    async function UpdateIPO() {
        const dataModel = {
            "id": id,
            "remarks": remarks,
            "pricePerShare": priceperShare,
            "totalNumberOfShares": totShares,
            "openDateTime": date + ' ' + time,
            "companyName": companyName
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/updateIPOs', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization":window.sessionStorage.getItem("token")
            },
            body: JSON.stringify(dataModel)
        });
        return res;
    }

    async function AddIPO() {
        const dataModel = {
            "remarks": remarks,
            "pricePerShare": priceperShare,
            "totalNumberOfShares": totShares,
            "openDateTime": date + ' ' + time,
            "companyName": companyName
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/addIPO', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization":window.sessionStorage.getItem("token")
            },
            body: JSON.stringify(dataModel)
        });
        return res;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (update) {
            UpdateIPO().then((data) => {
                console.log(data);
                loadDataApi('https://stockoneapp-boot.herokuapp.com/getIPOs').then((data) => {
                    setipos(data)
                });
            });
            setUpdate(false);
        } else {
            AddIPO().then((data) => {
                console.log(data);
                loadDataApi('https://stockoneapp-boot.herokuapp.com/getIPOs').then((data) => {
                    setipos(data)
                });
            });
        }
        clearFields();
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
                <Container>
                    <center>
                        <h3>IPO's List</h3>
                        <Table striped bordered hover size="md" >
                            <thead >
                                <tr >
                                    <td>Id</td>
                                    <td>Company Name</td>
                                    <td>Price Per Share</td>
                                    <td>Total Shares</td>
                                    <td>Open Date Time</td>
                                    <td>Remarks</td>
                                    <td>Ops</td>
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
                                            <td><button
                                                onClick={
                                                    function () {
                                                        setcompanyName(ipo.companyName);
                                                        var dateTime = ipo.openDateTime
                                                        const arr = dateTime.split(" ");
                                                        setdate(arr[0]);
                                                        setpriceperShare(ipo.pricePerShare);
                                                        settotShares(ipo.totalNumberOfShares);
                                                        setremarks(ipo.remarks);
                                                        settime(arr[1]);
                                                        setid(ipo.id)
                                                        setUpdate(true)
                                                    }
                                                } >&#9998;</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </center>
                </Container>

            </div>

            <div>
            <Container><h3>Add IPO</h3></Container>
                <Container style={{ borderRadius: '8px', padding: '16px', border: '4px solid lightgrey' }}>
                {toggleAdd ?
                    <div>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <FormControl
                                        aria-label="exchange name"
                                        aria-describedby="basic-addon1"
                                        value={companyName}
                                        onChange={(e) => setcompanyName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Price per share</Form.Label>
                                    <FormControl
                                     type='number'
                                        aria-label="price per share"
                                        aria-describedby="basic-addon1"
                                        value={priceperShare}
                                        onChange={(e) => setpriceperShare(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Total Shares</Form.Label>
                                    <FormControl
                                     type='number'
                                        aria-describedby="basic-addon1"
                                        value={totShares}
                                        onChange={(e) => settotShares(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Open Date</Form.Label>
                                    <FormControl
                                     type='date'
                                        aria-describedby="basic-addon1"
                                        value={date}
                                        onChange={(e) => setdate(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Open Time</Form.Label>
                                    <FormControl
                                     type='time'
                                        aria-describedby="basic-addon1"
                                        value={time}
                                        onChange={(e) => settime(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Remarks</Form.Label>
                                    <FormControl
                                     type='text'
                                        aria-describedby="basic-addon1"
                                        value={remarks}
                                        onChange={(e) => setremarks(e.target.value)}
                                    />
                                </Form.Group>
                            <Button type='submit' >{update ? 'Update IPO' : 'Add IPO'}</Button>
                        </Form>
                    </div>
                    : ''}
                    </Container>
                    <br></br>
            </div>
        </div>
    )
}

export default IPODetails
