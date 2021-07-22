import React,{useState} from 'react'
import YourProfile from './User/YourProfile';

function DashboardUser() {
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
                        <button>IPOs Tab</button>
                        <span>  </span>
                        <button>Companies Tab</button>
                        <span>  </span>
                        <button>Sector Tab</button>
                        <span>  </span>
                        <button onClick={function () { setComp('Profile') }}>Your Profile</button>
                        <span>  </span>
                        <button>Logout</button>
                    </div>
                    </center><br></br>
                    <div id="wrap">
                        {comp === 'Profile' && (
                            <YourProfile />
                        )}
                        {/*{comp === 'ManageExchange' && (
                            <ManageExchange />
                        )}
                        {comp === 'IPODetails' && (
                            <IPODetails />
                        )}
                        {comp === 'ImportData' && (
                            <SheetJSApp />
                        )} */}
                    </div>

                </div>
        </div>
    )
}

export default DashboardUser
