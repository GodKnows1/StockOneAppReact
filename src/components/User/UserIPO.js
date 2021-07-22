import React, { useEffect, useState } from 'react'
import { loadDataApi } from '../EndPoints/Commons';

function UserIPO() {

    const [ipos, setipos] = useState([]);
    const [companyName, setcompanyName] = useState('');

    async function GetIPO(comp) {
        const res = await fetch(`http://localhost:8080/getIPOByCompanyName?companyName=${comp}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
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
        loadDataApi('http://localhost:8080/getIPOs').then((data) => {
            setipos(data)
        });
    }, []);
    return (
        <div>
            <br></br>
            <div>
                <div>
                    <h3>IPO's List</h3>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={companyName}
                            placeholder="Search For Company"
                            onChange={(e) => {
                                setcompanyName(e.target.value)
                                console.log(e.target.value);
                                if (e.target.value === "") {
                                    console.log("hello")
                                    loadDataApi('http://localhost:8080/getIPOs').then((data) => {
                                        setipos(data)
                                    });
                                }
                            }} />
                        <input type="submit" value="Find" />
                    </form>
                    <br />
                </div>
                <table style={{ borderSpacing: '10px', border: "solid 3px black" }}>
                    <thead >
                        <tr >
                            <td>Id</td>
                            <td>Company Name</td>
                            <td>Price Per Share</td>
                            <td>Total Shares</td>
                            <td>Open Date Time</td>
                            <td>Remarks</td>
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
                </table>
                <br />
                <button onClick={() => {
                    loadDataApi('http://localhost:8080/getIPOChronologically').then((data) => {
                        setipos(data)
                    });
                }}>Show IPO Chronologically</button>

            </div>
        </div>
    )
}

export default UserIPO
