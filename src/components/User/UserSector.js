import React, { useState } from 'react';
import { useEffect } from 'react';
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
        loadDataApi('http://localhost:8080/getSectors').then((data) => {
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
        loadDataApi(`http://localhost:8080/getSectorDetailsByName?name=${SectorName}`).then((data) => {
            if (!data) return;
            setSingle(true);
            setSector(data);
        });
    }

    const SearchComp = (e) => {
        e.preventDefault();
        setshowTable(true);
        loadDataApi(`http://localhost:8080/getListofCompaniesinSector?sectorName=${sect}`).then((data) => {
            setcomname(data);
        });
    }

    return (
        <div>
            <center>
                <h3>Sector List</h3>

                <form onSubmit={onSearchBySectorName}>
                    <input type="text"
                        value={SectorName}
                        placeholder="Search Sector By Name"
                        onChange={(e) => {
                            setSectorName(e.target.value);
                            if (e.target.value === "") {
                                setSingle(false)
                                loadDataApi('http://localhost:8080/getSectors').then((data) => {
                                    setsectors(data);

                                });
                            }
                        }
                        }
                    /><span> </span>
                    <input type='submit' value='Search' />
                </form>
                <br></br>
                <table style={{ border: '2px solid black' }}>
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
                </table><br></br>


                <h3>Search Companies Names In Sector</h3>
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
                <br></br>
                {
                    showTable ?
                        <table style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                </tr>
                            </thead>
                            {
                                comname.map(comp =>
                                    <tr>
                                        <td>{comp}</td>
                                    </tr>
                                )
                            }
                        </table>
                        : ''
                }

                <CompareSector/>
                <br></br>
            </center>
        </div>
    )
}

export default UserSector
