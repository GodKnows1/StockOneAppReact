import React, { useState, useEffect } from 'react'
import Button from '../Button'
import AddEntity from '../SectorPrice/AddEntity';

function ManageExchange() {

    const [exchanges, setExchanges] = useState([]);

    const [exchangeName, setexchangeName] = useState('');
    const [exchangeBrief, setexchangeBrief] = useState('');
    const [exchangeAdd, setexchangeAdd] = useState('');
    const [exchangeRemarks, setexchangeRemarks] = useState('');

    async function loadData() {
        const res = await fetch('http://localhost:8080/getStockExchanges', {
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
        const dataModel ={
            "name":exchangeName,
            "brief":exchangeBrief,
            "address":exchangeAdd,
            "remarks":exchangeRemarks
        }
        const res = await fetch('http://localhost:8080/addStockExchange', {
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
                    <h3>Stock Exchange List</h3>
                    <table style={{ borderSpacing: '10px', border: "solid 3px black" }}>
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
                    </table>
                    <br /><br />

                </div> 

            <div>
                <br></br>
                <Button
                    color={toggleAdd ? 'red' : 'green'}
                    text={toggleAdd ? 'Close Form' : 'Add StockExchange'}
                    onClick={function () { setToggleAdd(!toggleAdd); clearFields(); }}
                />
                {toggleAdd ?
                    <div>
                        <h3>Add Stock Exchange</h3>
                        <form onSubmit={onSubmit}>
                            <div >
                                <label>Exchange Name</label>
                                <input
                                    type='text'
                                    value={exchangeName}
                                    onChange={(e) => setexchangeName(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Exchange Brief</label>
                                <input
                                    type='text'
                                    value={exchangeBrief}
                                    onChange={(e) => setexchangeBrief(e.target.value)}
                                />
                            </div>

                            <div >
                                <label>Exchange Address</label>
                                <input
                                    type='text'
                                    value={exchangeAdd}
                                    onChange={(e) => setexchangeAdd(e.target.value)}
                                />
                            </div>
                            <div >
                                <label>Exchange Remarks</label>
                                <input
                                    type='text'
                                    value={exchangeRemarks}
                                    onChange={(e) => setexchangeRemarks(e.target.value)}
                                />
                            </div>
                            <input type='submit' value='Add Exchange' />
                        </form>
                    </div>
                    : ''}
            </div>
        </div>
    )
}

export default ManageExchange
