import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Container, Table, Form, Button, Row, Col, FormControl } from 'react-bootstrap';
import {dep1} from './EndPoints/Commons'

function ManageCompany(props) {

    const [companies, setCompanies] = useState([]);
    const [map, setMap] = useState(['mlm']);

    const [id, setid] = useState(0);
    const [companyName, setcompanyName] = useState('');
    const [turnover, setturnover] = useState(0);
    const [bod, setbod] = useState('');
    const [sector, setsector] = useState('');
    const [brief, setbrief] = useState('');
    const [ceo, setceo] = useState('');

    const [stockExchange, setstockExchange] = useState('');
    const [comst, setcomst] = useState('');

    const [update, setUpdate] = useState(false);

    const history = useHistory();

    function clearFields() {
        setturnover(0); setbod(''); setbrief(''); setceo(''); setsector(''); setcompanyName(''); setcomst(''); setstockExchange('');
    }

    async function DeleteCompany(name) {
        const res = await fetch(`${dep1}/deleteCompany/${name}`, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization":window.sessionStorage.getItem("token")
            }
        });
        loadData().then((data) => {
            setCompanies(data)
        });

    }

    async function UpdateCompany() {
        const dataModel = {
            "id": id,
            "companyName": companyName,
            "turnover": turnover,
            "ceo": ceo,
            "boardOfDirectors": bod,
            "companyBrief": brief,
            "sectorName": sector
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/updateCompany', {
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

    async function MapCompany(exchange_name, com_name) {
        const dataModel = {
            "com_name": exchange_name,
            "name": com_name
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/mapStockCompany', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization":window.sessionStorage.getItem("token")
            },
            body: JSON.stringify(dataModel)
        });
        clearFields();
        return res;
    }

    async function AddCompany() {
        const dataModel = {
            "companyName": companyName,
            "turnover": turnover,
            "ceo": ceo,
            "boardOfDirectors": bod,
            "companyBrief": brief,
            "sectorName": sector
        }
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/addCompany', {
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
            UpdateCompany().then((data) => {
                console.log(data);
                loadData().then((data) => {
                    setCompanies(data)
                });
            });
            setUpdate(false);
        } else {
            AddCompany().then((data) => {
                console.log(data);
                loadData().then((data) => {
                    setCompanies(data)
                });
            });
        }

        clearFields();
    }

    async function loadCompanyInExchange(name) {
        const res = await fetch(`https://stockoneapp-boot.herokuapp.com/getListedinExchange/${name}`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization":window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    async function loadData() {
        const res = await fetch('https://stockoneapp-boot.herokuapp.com/getCompanies', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization":window.sessionStorage.getItem("token")
            }
        });

        return res.json();
    }

    useEffect(() => {
        loadData().then((data) => {
            setCompanies(data);
            console.log(companies);
        })
    }, []);

    const [toggleAdd, setToggleAdd] = useState(true); // Form
    const [toggleExc, setToggleExc] = useState(true); // Exchange Form

    return (
        <div>
            <br></br>
            <center>
                <div>
                    <h3>Company List</h3>
                    <Container>
                        <Table striped bordered hover size="md" >
                            <thead >
                                <tr >
                                    <th>Id</th>
                                    <th>Company Name</th>
                                    <th>Company Brief</th>
                                    <th>CEO</th>
                                    <th>Board of Directors</th>
                                    <th>Sector Name</th>
                                    <th>Turnover</th>
                                    {/* <td><span >Listed In</span> <span>/</span><br></br>Add Exchange</td> */}
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    companies.map(company =>
                                        <tr key={company.id}>
                                            <td>{company.id}</td>
                                            <td>{company.companyName}</td>
                                            <td>{company.companyBrief}</td>
                                            <td>{company.ceo}</td>
                                            <td>{company.boardOfDirectors}</td>
                                            <td>{company.sectorName}</td>
                                            <td>{company.turnover}</td>
                                            {/* <td style={{ color: 'red' }}>{map}</td> */}
                                            <td><button
                                                onClick={
                                                    function () {
                                                        setsector(company.sectorName);
                                                        setbod(company.boardOfDirectors);
                                                        setbrief(company.companyBrief);
                                                        setceo(company.ceo);
                                                        setturnover(company.turnover);
                                                        setcompanyName(company.companyName);
                                                        setid(company.id)

                                                        setUpdate(true)
                                                    }
                                                } >&#9998;</button></td>
                                            <td>
                                                <button onClick={function () {
                                                    DeleteCompany(company.companyName);
                                                }}>&times;</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Container>
                    <br /><br />
                </div>
            </center>
            <Container style={{ borderRadius: '8px', padding: '16px', border: '4px solid lightgrey' }}>
                <br></br>
                {/*  */}
                <div class="row">
                    <div class="col-sm-6">
                        {/* <Button
                            onClick={function () { setToggleAdd(!toggleAdd); setUpdate(false); clearFields(); }}
                        >{update ? 'Update Company' : (toggleAdd ? 'Close Form' : 'Add Company')}</Button> */}
                        {toggleAdd ?
                            <div>
                                <h3>{update ? 'Update Company' : 'Add Company'}</h3>
                                <Form onSubmit={onSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Name</Form.Label>
                                        <FormControl
                                            aria-label="company name"
                                            aria-describedby="basic-addon1"
                                            value={companyName}
                                            onChange={(e) => setcompanyName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CEO</Form.Label>
                                        <FormControl
                                            aria-label="company ceo"
                                            aria-describedby="basic-addon1"
                                            value={ceo}
                                            onChange={(e) => setceo(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Turnover</Form.Label>
                                        <FormControl
                                            aria-label="company turnover"
                                            aria-describedby="basic-addon1"
                                            type='number'
                                            value={turnover}
                                            onChange={(e) => setturnover(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Board of Direc.</Form.Label>
                                        <FormControl
                                            aria-label="company BOD"
                                            aria-describedby="basic-addon1"
                                            type='text'
                                            value={bod}
                                            onChange={(e) => setbod(e.target.value)}
                                        />
                                    </Form.Group><Form.Group className="mb-3">
                                        <Form.Label>Brief</Form.Label>
                                        <FormControl
                                            aria-label="company brief"
                                            aria-describedby="basic-addon1"
                                            type='text'
                                            value={brief}
                                            onChange={(e) => setbrief(e.target.value)}
                                        />
                                    </Form.Group><Form.Group className="mb-3">
                                        <Form.Label>Sector Associated With</Form.Label>
                                        <FormControl
                                            aria-label="company sector"
                                            aria-describedby="basic-addon1"
                                            type='text'
                                            value={sector}
                                            onChange={(e) => setsector(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button type='submit' >{update ? 'Update Company' : 'Add Company'}</Button>
                                </Form>
                            </div>
                            : ''}
                    </div>
                    <div class="col-sm-6">
                        <div>
                            {/* <Button
                                onClick={function () { setToggleExc(!toggleExc); clearFields(); }}
                            >{!toggleExc ? 'Map Company with Exchange' : 'Close Mapping Form'}</Button> */}

                            {toggleExc ?
                                <div>
                                    <h3>Map Company With Exchange</h3>
                                    <Form onSubmit={(e) => { e.preventDefault(); MapCompany(comst, stockExchange) }}>
                                        <Form.Group>
                                            <Form.Label>Company Name</Form.Label>
                                            <FormControl
                                                aria-label="company Name"
                                                aria-describedby="basic-addon1"
                                                type='text'
                                                value={comst}
                                                onChange={(e) => setcomst(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Exchange Name</Form.Label>
                                            <FormControl
                                                aria-label="exchange Name"
                                                aria-describedby="basic-addon1"
                                                type='text'
                                                value={stockExchange}
                                                onChange={(e) => setstockExchange(e.target.value)}
                                            />
                                        </Form.Group>
                                        <br></br>
                                        <Button type='submit' >Map Company</Button>
                                    </Form>
                                </div>
                                : ''}

                        </div>
                    </div>
                </div>

            </Container><br /><br />

        </div>
    )
}

export default ManageCompany
