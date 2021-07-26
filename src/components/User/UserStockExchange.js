import React, { useState, useEffect } from 'react'
import { Form, Table,Button,Container } from 'react-bootstrap';
import { loadDataApi } from '../EndPoints/Commons';

function UserStockExchange() {

    const [exchanges, setExchanges] = useState([]);
    const [company, setcompany] = useState([]);
    const [code,setcode]=useState('');
    const [showTable,setshowTable]=useState(false)

    const SearchCompanyInExc=(e)=>{
        e.preventDefault();
        setshowTable(true);
        loadDataApi(`https://stockoneapp-boot.herokuapp.com/getCompanyByExchange?name=${code}`).then((data) => {
            console.log(data)
            setcompany(data);
        })
    }

    useEffect(() => {
        loadDataApi('https://stockoneapp-boot.herokuapp.com/getStockExchanges').then((data) => {
            setExchanges(data)
        });
    }, []);


    return (
        <div>
            <br></br>
            <center>
                <div>
                    <center>
                    <h3>Stock Exchange List</h3>
                    </center>
                    <Container>
                    <Table hover striped bordered size="sm" style={{width:'80%'}}>
                        <thead >
                            <tr >
                                <th>Id</th>
                                <th>Exchange Name</th>
                                <th>Exchange Brief</th>
                                <th>Exchange Address</th>
                                <th>Exchange Remarks</th>
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
                    </Table>
                    </Container>
                    <br></br>
                <h4>View Company in Exchange</h4>
                <Form onSubmit={SearchCompanyInExc}>
                <input type="text"
                        value={code}
                        placeholder="Enter Exchange Name"
                        onChange={(e) => {
                                setcode(e.target.value);
                            }
                        }
                    /><span> </span>
                    <Button type='submit' size="sm">Search</Button><br></br>
                </Form><br></br>
                </div>
              {
                  showTable?
                  <Table hove bordered striped size="md" style={{width:'20%'}}>
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
                  </Table>
                  
                  :''
              }
              </center>
        </div>
    )
}

export default UserStockExchange
