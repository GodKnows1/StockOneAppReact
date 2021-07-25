import React,{useState} from 'react'
import YourProfile from './User/YourProfile';
import UserIPO from './User/UserIPO';
import UserCompany from './User/UserCompany'
import UserStockExchange from './User/UserStockExchange';
import UserSector from './User/UserSector';
import { Nav,Button } from 'react-bootstrap';

function DashboardUser(props) {
    const [comp, setComp] = useState('');

    return (
        <div >
            <br></br>
                <center>
                <h3>User Dashboard</h3>
                </center>
                <div>
                <Nav justify variant="tabs" defaultActiveKey="manage">
                    <Nav.Item onClick={function () { setComp('IPO') }}>
                        <Nav.Link eventKey="ipo" variant="dark" >IPOs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item  onClick={function () { setComp('Company') }}>
                        <Nav.Link eventKey="company" variant="light" >Companies</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={function () { setComp('Sector') }}>
                        <Nav.Link variant="light" eventKey="sector" >Sectors</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={function () { setComp('Profile') }}>
                        <Nav.Link eventKey="profile" variant="light" >Your Profile </Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={function () { setComp('StockExchanges') }}>
                        <Nav.Link eventKey="exch" variant="light" >Stock Exchanges</Nav.Link>
                    </Nav.Item>
                    <Button onClick={()=>{ window.sessionStorage.clear(); props.history.push('/');}}>Logout</Button>
                </Nav>
                    
                    <div >
                        {comp === 'Profile' && (
                            <YourProfile />
                        )}
                        {comp === 'IPO' && (
                            <UserIPO />
                        )}
                        {comp === 'Company' && (
                            <UserCompany />
                        )}
                        {comp === 'StockExchanges' && (
                            <UserStockExchange />
                        )}
                        {comp === 'Sector' && (
                            <UserSector />
                        )}
                        
                    </div>

                </div>
        </div>
    )
}

export default DashboardUser
