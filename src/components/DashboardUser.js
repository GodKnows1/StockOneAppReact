import React,{useState} from 'react'
import YourProfile from './User/YourProfile';
import UserIPO from './User/UserIPO';
import UserCompany from './User/UserCompany'
import UserStockExchange from './User/UserStockExchange';
import UserSector from './User/UserSector';

function DashboardUser(props) {
    const [comp, setComp] = useState('');

    return (
        <div >
                <hr></hr>
                <center>
                <h3>User Dashboard</h3>
                </center>
                <div>
                    <center>
                    <div>
                        <button onClick={function () { setComp('IPO') }}>IPOs Tab</button>
                        <span>  </span>
                        <button onClick={function () { setComp('Company') }}>Companies Tab</button>
                        <span>  </span>
                        <button onClick={function () { setComp('Sector') }}>Sector Tab</button>
                        <span>  </span>
                        <button onClick={function () { setComp('Profile') }}>Your Profile</button>
                        <span>  </span>
                        <button onClick={function () { setComp('StockExchanges') }}>Stock Exchanges</button>
                        <span>  </span>
                        <button  onClick={function () { window.sessionStorage.clear(); props.history.push('/'); }}>Logout</button>
                    </div>
                    </center><br></br>
                    <div >
                        <div id="wrap">
                        {comp === 'Profile' && (
                            <YourProfile />
                        )}
                        </div>
                        <center>
                        {comp === 'IPO' && (
                            <UserIPO />
                        )}
                        </center>
                        {comp === 'Company' && (
                            <UserCompany />
                        )}
                        <center>
                        {comp === 'StockExchanges' && (
                            <UserStockExchange />
                        )}
                        {comp === 'Sector' && (
                            <UserSector />
                        )}
                        </center>
                        
                    </div>

                </div>
        </div>
    )
}

export default DashboardUser
