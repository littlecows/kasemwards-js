import './tab-bar.css'
import React, { useState } from 'react';
import './dashboard.jsx'

import Dashboard from './dashboard.jsx';
import Dispensing from './dispensing.jsx';
import Instock from './instock.jsx';
import Receive from './receive.jsx';

function Tabbar() {

    const component = {
        'Dashboard': <Dashboard/>,
        'Dispensing': <Dispensing/>,
        'Instock': <Instock/>,
        'Receive': <Receive/>
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [menuSelect, setMenuSelect] = useState('Dashboard')

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const selectMenu = (menu) => {
        setMenuSelect(menu)
    }

    
    return(
        <div>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
                <h2>Management System</h2>
                <a href="#Dashboard" onClick={() => selectMenu('Dashboard')}>Dashboard</a>
                <a href="#Dispensing" onClick={() => selectMenu('Dispensing')}>Dispensing</a>
                <a href="#Instock" onClick={() => selectMenu('Instock')}>รายการยาคงเหลือ</a>
                <a href="#Receive" onClick={() => selectMenu('Receive')}>รับยาเข้าคลัง</a>
                <a href="#logout">Logout</a>
            </div>

            <div className="content" style={{ marginLeft: sidebarOpen ? '250px' : '0' }}>
                <button className="openbtn" onClick={toggleSidebar} type='button'>☰ {sidebarOpen ? 'Close Menu' : 'Open Menu'}</button>
                <div>
                    {component[menuSelect]}
                </div>
            </div>
        </div>
    )
}


export default Tabbar