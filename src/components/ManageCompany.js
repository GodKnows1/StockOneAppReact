import React, { useState, useEffect } from 'react'
import Button from './Button';
import { useHistory } from "react-router-dom";


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
    const [comst,setcomst]=useState('');

    const [update, setUpdate] = useState(false);

    const history = useHistory();

    function clearFields() {
        setturnover(0); setbod(''); setbrief(''); setceo(''); setsector(''); setcompanyName('');setcomst('');setstockExchange('');
    }

    async function DeleteCompany(name) {
        const res = await fetch(`http://localhost:8080/deleteCompany/${name}`, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
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
        const res = await fetch('http://localhost:8080/updateCompany', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataModel)
        });
        return res;
    }

    async function MapCompany(exchange_name,com_name) {
        const dataModel = {
            "com_name":exchange_name,
            "name":com_name
        }
        const res = await fetch('http://localhost:8080/mapStockCompany', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
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
        const res = await fetch('http://localhost:8080/addCompany', {
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
        const res = await fetch(`http://localhost:8080/getListedinExchange/${name}`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        });
        return res.json();
    }

    async function loadData() {
        const res = await fetch('http://localhost:8080/getCompanies', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
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
            
                <div>
                    <h3>Company List</h3>
                    <table style={{ borderSpacing: '10px', border: "solid 3px black" }}>
                        <thead >
                            <tr >
                                <td>Id</td>
                                <td>Company Name</td>
                                <td>Company Brief</td>
                                <td>CEO</td>
                                <td>Board of Directors</td>
                                <td>Sector Name</td>
                                <td>Turnover</td>
                                <td><span >Listed In</span> <span>/</span><br></br>Add Exchange</td>
                                <td>Ops</td>
                                <td>Delete</td>
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
                                        <td style={{ color: 'red' }}>{map}</td>
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
                    </table>
                    <br /><br />

                </div>
            <div>
                <br></br>
                <Button
                    color={toggleAdd ? 'red' : 'green'}
                    text={update ? 'Update Company' : (toggleAdd ? 'Close Form' : 'Add Company')}
                    onClick={function () { setToggleAdd(!toggleAdd); setUpdate(false); clearFields(); }}
                />
                {toggleAdd ?
                    <div>
                        <h2>{update ? 'Update Company' : 'Add Company'}</h2>
                        <form onSubmit={onSubmit}>
                            <div >
                                <label>Company Name</label>
                                <input
                                    type='text'
                                    value={companyName}
                                    onChange={(e) => setcompanyName(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>CEO</label>
                                <input
                                    type='text'
                                    value={ceo}
                                    onChange={(e) => setceo(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Turnover</label>
                                <input
                                    type='number'
                                    value={turnover}
                                    onChange={(e) => setturnover(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Board of Directors</label>
                                <input
                                    type='text'
                                    value={bod}
                                    onChange={(e) => setbod(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Company Brief</label>
                                <input
                                    type='text'
                                    value={brief}
                                    onChange={(e) => setbrief(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Sector Associated With</label>
                                <input
                                    type='text'
                                    value={sector}
                                    onChange={(e) => setsector(e.target.value)}
                                />
                            </div>
                            <input type='submit' value={update ? 'Update Company' : 'Add Company'} />
                        </form>
                    </div>
                    : ''}
            </div><br /><br />
            <div>
                <Button
                    color={toggleExc ? 'red' : 'green'}
                    text={!toggleExc ? 'Map Company with Exchange' : 'Close Mapping Form'}
                    onClick={function () { setToggleExc(!toggleExc); clearFields(); }}
                />

                {toggleExc ?
                    <div>
                        <h2>Map Company With Exchange</h2>
                        <form onSubmit={(e)=>{e.preventDefault();MapCompany(comst,stockExchange)}}>
                            <div >
                                <label>Company Name</label>
                                <input
                                    type='text'
                                    value={comst}
                                    onChange={(e) => setcomst(e.target.value)}
                                />
                            </div>

                            <div >
                                <label>Stock Exchange Name</label>
                                <input
                                    type='text'
                                    value={stockExchange}
                                    onChange={(e) => setstockExchange(e.target.value)}
                                />
                            </div>
                            <input type='submit' value='Map Exchange' />
                        </form>
                    </div>

                    : ''}

            </div>
        </div>
    )
}

export default ManageCompany
