import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, Button, Table, Container } from 'react-bootstrap';
import { loadDataApi } from '../EndPoints/Commons';
import CompareSector from '../Sector/CompareSector';

function UserSector() {

    const [sectors, setsectors] = useState([]);
    const [SectorName, setSectorName] = useState('');
    const [Sector, setSector] = useState({});
    const [single, setSingle] = useState(false);

    const [sect, setsect] = useState([]);
    const [showTable, setshowTable] = useState(false);
    const [comname, setcomname] = useState([]);

    useEffect(() => {
        loadDataApi('https://stockoneapp-boot.herokuapp.com/getSectors').then((data) => {
            setsectors(data);
            console.log(data);

        });
    }, [])

    const onSearchBySectorName = (e) => {
        e.preventDefault();
        if (!SectorName) {
            alert('Please fill the details')
            return
        }
        setSingle(true);
        loadDataApi(`https://stockoneapp-boot.herokuapp.com/getSectorDetailsByName?name=${SectorName}`).then((data) => {
            if (!data) return;
            setSingle(true);
            setSector(data);
        });
    }

    const SearchComp = (e) => {
        e.preventDefault();
        setshowTable(true);
        loadDataApi(`https://stockoneapp-boot.herokuapp.com/getListofCompaniesinSector?sectorName=${sect}`).then((data) => {
            setcomname(data);
        });
    }

    return (
        <div>
            <center>
                <h3>Sector List</h3>

                <Form onSubmit={onSearchBySectorName}>
                    <input type="text"
                        value={SectorName}
                        placeholder="Search Sector By Name"
                        onChange={(e) => {
                            setSectorName(e.target.value);
                            if (e.target.value === "") {
                                setSingle(false)
                                loadDataApi('https://stockoneapp-boot.herokuapp.com/getSectors').then((data) => {
                                    setsectors(data);

                                });
                            }
                        }
                        }
                    /><span> </span>
                    <Button type='submit' size="sm">Search</Button>
                </Form>
                <br></br>
                <Container>
                    <Table hover bordered striped size="md">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>SECTOR NAME</th>
                                <th>SECTOR BRIEF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!single ? (
                                sectors.map(Sector =>
                                    <tr key={Sector.id}>
                                        <td>{Sector.id}</td>
                                        <td>{Sector.sectorName}</td>
                                        <td>{Sector.brief}</td>
                                    </tr>
                                )
                            ) : (<tr key={Sector.id}>
                                <td>{Sector.id}</td>
                                <td>{Sector.sectorName}</td>
                                <td>{Sector.brief}</td>
                            </tr>)
                            }
                        </tbody>
                    </Table>
                </Container>
                <br></br>


                <h3>Search Companies in a Sector</h3>
                <form onSubmit={SearchComp}>
                    <input type="text"
                        value={sect}
                        placeholder="Enter Company Name"
                        onChange={(e) => {
                            setsect(e.target.value);
                        }
                        }
                    /><span> </span>
                    <input type='submit' value='Search' /><br></br>
                </form>

                {
                    showTable ?
                        <Container>
                            <br></br>
                            <Table style={{ width: '30%' }} hover bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        comname.map(comp =>
                                            <tr>
                                                <td>{comp}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Container>
                        : ''
                }
                <br></br>
            </center>
            <CompareSector />

        </div>
    )
}

export default UserSector
