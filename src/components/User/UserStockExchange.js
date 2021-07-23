import React, { useState, useEffect } from 'react'
import { loadDataApi } from '../EndPoints/Commons';

function UserStockExchange() {

    const [exchanges, setExchanges] = useState([]);
    const [company, setcompany] = useState([]);
    const [code,setcode]=useState('');
    const [showTable,setshowTable]=useState(false)

    const SearchCompanyInExc=(e)=>{
        e.preventDefault();
        setshowTable(true);
        loadDataApi(`http://localhost:8080/getCompanyByExchange?name=${code}`).then((data) => {
            console.log(data)
            setcompany(data);
        })
    }

    useEffect(() => {
        loadDataApi('http://localhost:8080/getStockExchanges').then((data) => {
            setExchanges(data)
        });
    }, []);


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
                    <br></br>
                <h3>View Company in Exchange</h3>
                <form onSubmit={SearchCompanyInExc}>
                <input type="text"
                        value={code}
                        placeholder="Enter Exchange Name"
                        onChange={(e) => {
                                setcode(e.target.value);
                            }
                        }
                    /><span> </span>
                    <input type='submit' value='Search' /><br></br>
                </form><br></br>
                </div>
              {
                  showTable?
                  <table style={{ border: '2px solid black' }}>
                      <thead >
                            <tr >
                                <td><b>Company Name</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                company.map(exchange =>
                                    <tr >
                                        <td>{exchange}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                  </table>
                  
                  :''
              }
        </div>
    )
}

export default UserStockExchange
