import React, { useState } from 'react';
import ManageCompany from './ManageCompany';
import ManageExchange from './StockExchange/ManageExchange';
import IPODetails from './Company/IPODetails';
import SheetJSApp from './SectorPrice/AddEntity';
import { Button, Container, Nav } from 'react-bootstrap';

function Dashboard(props) {

    const [comp, setComp] = useState('');

    return (
        <div>
            <center>
            <h3>Admin Dashboard</h3>
            </center>
            <div>
                <Nav justify variant="tabs" defaultActiveKey="manage">
                    <Nav.Item onClick={function () { setComp('ImportData') }}>
                        <Nav.Link eventKey="share" variant="dark" >ImportData</Nav.Link>
                    </Nav.Item>
                    <Nav.Item  onClick={function () { setComp('ManageCompany') }}>
                        <Nav.Link eventKey="company" variant="light" >Manage Company</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={function () { setComp('ManageExchange') }}>
                        <Nav.Link variant="light" eventKey="exchange" >Manage Exchange</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={function () { setComp('IPODetails') }}>
                        <Nav.Link eventKey="ipo" variant="light" >IPO Details</Nav.Link>
                    </Nav.Item>
                    <Button onClick={()=>{ window.sessionStorage.clear(); props.history.push('/');}}>Logout</Button>
                </Nav>
                {/* <div>
                    <Button onClick={function () { setComp('ImportData') }}>Import Data</Button>
                    <span>  </span>
                    <Button onClick={function () { setComp('ManageCompany') }}>Manage Company</Button>
                    <span>  </span>
                    <Button onClick={function () { setComp('ManageExchange') }}>Manage Exchange</Button>
                    <span>  </span>
                    <Button onClick={function () { setComp('IPODetails') }}>Update IPO details</Button>
                    <span>  </span>
                    <Button>Logout</Button>
                </div> */}
                <br></br>
                <div>
                    {comp === 'ManageCompany' && (
                        <ManageCompany />
                    )}
                    {comp === 'ManageExchange' && (
                        <ManageExchange />
                    )}
                    {comp === 'IPODetails' && (
                        <IPODetails />
                    )}
                    {comp === 'ImportData' && (
                        <SheetJSApp />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Dashboard