import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import CompareCompany from '../Company/CompareCompany';
import { loadDataApi ,loadData2Api } from '../EndPoints/Commons';

function UserCompany() {

    const [companies, setCompanies] = useState([]);
    const [companyName, setcompanyName] = useState('');
    const [companyCode, setcompanyCode] = useState('');
    const [code,setcode]=useState('');
    const [listed,setlisted]=useState([]);
    const [codes,setcodes]=useState();
    const [showTable,setshowTable]=useState(false);


    const GET_COMPANIES_API = 'https://stockoneapp-boot.herokuapp.com/getCompanies';
    async function GetCompaniesApi() {
        const res = await fetch(GET_COMPANIES_API, {
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
        GetCompaniesApi().then((data) => {
            setCompanies(data);
            console.log(data);

        });
    }, [])


    async function SearchByCompanyNameApi(c) {
        const res = await fetch(`https://stockoneapp-boot.herokuapp.com/likeCompany?name=${c}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        });
        return res.json();
    }

    const onSearchByCompanyName = (e) => {
        e.preventDefault();
        if (!companyName) {
            alert('Please fill the details')
            return
        }
        SearchByCompanyNameApi(companyName).then((data) => {

            setCompanies(data);
            console.log(data);
        });
    }

    function SearchLikeCompanyName (c){
        SearchByCompanyNameApi(c).then((data) => {
            setCompanies(data);
            console.log(data);
        });
    }

    function SearchLikeCompanyCode (c){
        
        loadDataApi(`https://stockoneapp-boot.herokuapp.com/likeCompanyCode?name=${c}`).then((data) => {
            setCompanies(data);
            console.log(data);
        });
    }

    const SearchExchangeAndCode=(e)=>{
        e.preventDefault();
        setshowTable(true);
        loadDataApi(`https://stockoneapp-boot.herokuapp.com/getCompanyCode?name=${code}`).then((data) => {
            // setcodes(data);
            var d="";
            data.forEach(x=>{d=d+" "+x});
            setcodes(d);
            loadDataApi(`https://stockoneapp-boot.herokuapp.com/getListedinExchange/${code}`).then((data) => {
                var d="";
                data.forEach(x=>{d+=x;d+=" "});
                setlisted(d);
            });
        })
    }
    return (
        <div>
            <center>
                <br></br>
                <h3>Companies List</h3>

                <Form onSubmit={onSearchByCompanyName}>
                    <input type="text"
                        value={companyName}
                        placeholder="Search Company Name"
                        onChange={(e) => {
                                setcompanyName(e.target.value);
                                if (e.target.value === "") {
                                    GetCompaniesApi().then((data) => {
                                        setCompanies(data);
                                        console.log(data);
                            
                                    });
                                } else
                                    SearchLikeCompanyName(e.target.value);
                            }
                        }

                    /><span> </span>
                    <Button type='submit' variant="info" size="sm">Search</Button>
                </Form>

                <Form >
                    <input type="text"
                        value={companyCode}
                        placeholder="Search Company Code"
                        onChange={(e) => {
                                setcompanyCode(e.target.value);
                                if (e.target.value === "") {
                                    GetCompaniesApi().then((data) => {
                                        setCompanies(data);
                                        console.log(data);
                            
                                    });
                                } else
                                SearchLikeCompanyCode(e.target.value);
                            }
                        }

                    /><span> </span>
                    <Button type='button' variant="info" size="sm" onClick={()=>SearchLikeCompanyCode(companyCode)} >
                        Search</Button>
                </Form>
                
                <br></br>
                <Container>
                <Table bordered striped hover size="md">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>COMPANY NAME</th>
                            <th>COMPANY BRIEF</th>
                            <th>CEO</th>
                            <th>BOARD OF DIRECTORS</th>
                            <th>SECTOR NAME</th>
                            <th>TURNOVER</th>
                            {/* <th>STOCK EXCHANGE</th> */}
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
                                    {/* <td>{}</td> */}
                                </tr>
                            )
                            }
                
                    </tbody>
                </Table>
                </Container>
                <h3>View Code And Exchange</h3>
                <form onSubmit={SearchExchangeAndCode}>
                <input type="text"
                        value={code}
                        placeholder="Enter Company Name"
                        onChange={(e) => {
                                setcode(e.target.value);
                            }
                        }

                    /><span> </span>
                    <Button size="sm" type='submit' >Search</Button><br></br>
                </form><br></br>
                {
                    showTable?
                    <Container>
                    <Table hover striped bordered size="sm">
                        <thead>
                        <tr>
                            <th>EXCHANGES</th>
                            <th>COMPANY CODE</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{listed}</td>
                            <td>{codes}</td>
                        </tr>
                        </tbody>
                    </Table>
                    </Container>
                    :''
                }
                <br></br>
                <CompareCompany/>
            </center>
        </div>
    )
}

export default UserCompany
