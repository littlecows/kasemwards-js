import React, { useState } from 'react';

function NewMedic() {
    const [medicCodes, setCodes] = useState('');
    const [medicName, setMedic] = useState('');
    const [unit, setUnit] = useState('');
    const [medicPrefix, setMedicPrefix] = useState([]);

    const Prefix = (code, name, unit, medicPrefix, setMedicPrefix) => {
        if(code === '' || 
            name === '' || 
            unit === '') {
            alert('Cannot have empty data');
            return false;
        }

        if (medicPrefix.length > 0) {
            let exists = medicPrefix.some(item => item.code === code);

            if (exists) {
                alert('Data already exists');
                return false;
            } else {
                setMedicPrefix([
                    ...medicPrefix, 
                    { code: code, name: name, unit: unit }
                ]);
            }
        } else {
            setMedicPrefix([
                { code: code, name: name, unit: unit }
            ]);
        }
    }

    const Submit = () => {
        console.log(medicPrefix);
    }

    return (
        <>
            <br />
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">รหัสยา: </span>
                <input 
                    onChange={e => setCodes(e.target.value)} 
                    type="text" 
                    className="form-control" 
                    placeholder="..กรอกรหัสยาที่นี่.." 
                    aria-label="medicssid" 
                    aria-describedby="basic-addon2" 
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ชื่อยา: </span>
                <input 
                    onChange={e => setMedic(e.target.value)} 
                    type="text" 
                    className="form-control" 
                    placeholder="..กรอกชื่อยาที่นี่.." 
                    aria-label="medicname" 
                    aria-describedby="basic-addon1" 
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">หน่วยนับ: </span>
                <input 
                    onChange={e => setUnit(e.target.value)} 
                    type="text" 
                    className="form-control" 
                    placeholder="..กรอกหน่วยนับที่นี่.." 
                    aria-label="medicunit" 
                    aria-describedby="basic-addon1" 
                />
            </div>
            <button 
                className='btn btn-primary' 
                onClick={() => Prefix(medicCodes, medicName, unit, medicPrefix, setMedicPrefix)}
            >
                เพิ่มรายการ
            </button>

            <h3>ตารางแสดงรายการ</h3>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>รหัสยา</th>
                            <th>ชื่อยา</th>
                            <th>หน่วยนับ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicPrefix.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.unit}</td>
                                <td>
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => {
                                            setMedicPrefix(medicPrefix.filter((_, i) => i !== index));
                                        }}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className='btn btn-success' onClick={Submit}>ยืนยันการเพิ่มข้อมูล</button>
        </>
    );
}

export default NewMedic;
