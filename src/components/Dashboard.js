import React, { useState } from 'react';
import ManageCompany from './ManageCompany';
import ManageExchange from './StockExchange/ManageExchange';
import IPODetails from './Company/IPODetails';
import SheetJSApp from './SectorPrice/AddEntity';

function Dashboard(props) {

    const [comp, setComp] = useState('');

    return (
        <div>
            <center>
                <hr></hr>
                <h3>Admin Dashboard</h3>
                <div>
                    <div>
                        <button onClick={function () { setComp('ImportData') }}>Import Data</button>
                        <span>  </span>
                        <button onClick={function () { setComp('ManageCompany') }}>Manage Company</button>
                        <span>  </span>
                        <button onClick={function () { setComp('ManageExchange') }}>Manage Exchange</button>
                        <span>  </span>
                        <button onClick={function () { setComp('IPODetails') }}>Update IPO details</button>
                        <span>  </span>
                        <button>Logout</button>
                    </div>
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
            </center>
        </div>
    )
}

export default Dashboard