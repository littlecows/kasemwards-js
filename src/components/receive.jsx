import React, { useState, useEffect } from 'react';

function Receive() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [medic, setMedic] = useState(null)
    const [quantity, setQuantity] = useState(null)

    const [predata, setPredata] = useState([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/medic_detail')
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const result = await response.json()
                setData(result)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const reset = () => {
        setMedic('')
        setQuantity(null)
    }

    const preData = (medic, quantity) => {
        let medicData
        if (medic === null || medic === 'เลือกรายการที่นี่') {
            alert('กรุณาเลือกรายการที่ต้องการเพิ่ม')
            return false
        } else {
            medicData = medic.split(',')
        }

        if (quantity === null) {
            alert('กรุณาป้อนจำนวนรายการก่อน')
            return false
        }
        
        setPredata([
            ...predata, [medicData[0], medicData[1], quantity]
        ])

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            "data": predata
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/product_receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setMessage('Data added successfully!');

        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='container-fluid'>
            <h2>รับยาเข้าคลัง</h2>
            <button className='btn btn-primary' type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop">เพิ่มข้อมูล</button>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>ชื่อรายการ/ประเภท</th>
                        <th>จำนวน</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {predata.map((item) => {
                       return ( 
                        <tr key={item[0]+''+item[1]+''+item[2]}>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td><button className='btn btn-danger'>ลบ</button></td>
                        </tr>
                       )
                    })}
                </tbody>
            </table>
            <button className='btn btn-success' onClick={handleSubmit}>ยืนยัน</button>
            {message && <p>{message}</p>}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">รายการยา</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>รายการ</p>
                    <select className='form-select' onChange={(e) => setMedic(e.target.value)}>
                        <option>เลือกรายการที่นี่</option>
                        {data['medic'].map((item) => {
                            return <option key={item.code} value={item.id+','+item.name+'/'+item.unit}>{item.name}/ประเภท({item.unit})</option>
                        })}
                    </select>
                    <br />
                    <p>จำนวน</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => reset}>ปิด</button>
                    <button type="button" className="btn btn-success" onClick={() => preData(medic, quantity)}>เพิ่มข้อมูล</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Receive