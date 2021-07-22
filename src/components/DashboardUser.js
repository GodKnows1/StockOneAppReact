import React,{useState} from 'react'
import YourProfile from './User/YourProfile';
import UserIPO from './User/UserIPO';


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
                        <button onClick={function () { setComp('IPO') }}>IPOs Tab</button>
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
                        {/*{comp === 'IPODetails' && (
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
