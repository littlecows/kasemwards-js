import React, { useState, useEffect } from 'react';

function Dispensing() {

    const [types, setTypes] = useState(12)
    const [identify, setIndentify] = useState('')

    const handleType = (maxLength) => {
        setTypes(maxLength)
        setIndentify('')
    }

    const handleIdentify = (value) => {
        setIndentify(value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0'))
    }

    return (
        <>  
            <br />
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault"
                    value={4}
                    onChange={e => handleType(e.target.value)}
                    id="flexRadioDefault1"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    พนักงาน
                </label>
            </div>

            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="flexRadioDefault2" 
                    value={12}
                    onChange={e => handleType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    นักศึกษา
                </label>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">รหัส</span>
                <input 
                    type="text" 
                    className="form-control"
                    maxLength={types}
                    value={identify}
                    placeholder="....กรอกรหัสที่นี่...." 
                    aria-label="identify" 
                    aria-describedby="basic-addon1"
                    onChange={e => handleIdentify(e.target.value)}
                />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ผู้รับยา</span>
                <input 
                    type="text" 
                    className="form-control"
                    placeholder="....กรอกข้อมูลที่นี่...." 
                    aria-label="identify" 
                    aria-describedby="basic-addon1"
                />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">รายการ</span>
                <select 
                    name="" 
                    id=""
                    className='form-control'
                >
                    <option>เลือกรายการที่นี่</option>
                </select>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">จำนวน</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="....กรอกจำนวนที่นี่...." 
                    aria-label="identify" 
                    aria-describedby="basic-addon3"
                />
            </div>

            <button className='btn btn-primary'>เพิ่มข้อมูล</button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>รายการ</th>
                        <th>จำนวน</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </>
    )
}

export default Dispensing