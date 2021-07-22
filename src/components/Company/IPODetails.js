import React, { useState, useEffect } from 'react'
import Button from '../Button';
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
        const res = await fetch('http://localhost:8080/updateIPOs', {
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

    async function AddIPO() {
        const dataModel = {
            "remarks": remarks,
            "pricePerShare": priceperShare,
            "totalNumberOfShares": totShares,
            "openDateTime": date + ' ' + time,
            "companyName": companyName
        }
        const res = await fetch('http://localhost:8080/addIPO', {
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
            UpdateIPO().then((data) => {
                console.log(data);
                loadDataApi('http://localhost:8080/getIPOs').then((data) => {
                    setipos(data)
                });
            });
            setUpdate(false);
        } else {
            AddIPO().then((data) => {
                console.log(data);
                loadDataApi('http://localhost:8080/getIPOs').then((data) => {
                    setipos(data)
                });
            });
        }
        clearFields();
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
                <h3>IPO's List</h3>
                <table style={{ borderSpacing: '10px', border: "solid 3px black" }}>
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
                </table>
                <br /><br />

            </div>

            <div>
                <br></br>
                <Button
                    color={toggleAdd ? 'red' : 'green'}
                    text={update ? 'Update IPO' : (toggleAdd ? 'Close Form' : 'Add Company')}
                    onClick={function () { settoggleAdd(!toggleAdd); setUpdate(false); clearFields(); }}
                />
                {toggleAdd ?
                    <div>
                        <h3>Add Stock IPO</h3>
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
                                <label>Price Per share</label>
                                <input
                                    type='number'
                                    value={priceperShare}
                                    onChange={(e) => setpriceperShare(e.target.value)}
                                />
                            </div>

                            <div >
                                <label>Total Shares</label>
                                <input
                                    type='number'
                                    value={totShares}
                                    onChange={(e) => settotShares(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Open Date</label>
                                <input
                                    type='date'
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Open Time</label>
                                <input
                                    type='time'
                                    value={time}
                                    onChange={(e) => settime(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Remarks</label>
                                <input
                                    type='text'
                                    value={remarks}
                                    onChange={(e) => setremarks(e.target.value)}
                                />
                            </div>
                            <input type='submit' value={update ? 'Update IPO' : 'Add IPO'} />
                        </form>
                    </div>
                    : ''}
            </div>
        </div>
    )
}

export default IPODetails
