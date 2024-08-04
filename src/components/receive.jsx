import React, { useState, useEffect } from 'react';

function Receive() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [medic, setMedic] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [medicPrefix, setmedicPrefix] = useState([])
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

    const Prefix = (medic, quantity, medicPrefix, setmedicPrefix) => {
        let medicData
        if (!medic || medic === 'เลือกรายการที่นี่') {
            alert('กรุณาเลือกรายการที่ต้องการเพิ่ม')
            return false
        } else {
            medicData = medic.split(',')
        }

        if (!quantity) {
            alert('กรุณาป้อนจำนวนรายการก่อน')
            return false
        }
        
        if (medicPrefix.length > 0) {
            let exists = medicPrefix.some(item => item.id === medicData[0]);

            if (exists) {
                alert('มีข้อมูลนี้แล้ว');
                return false;
            } else {
                setmedicPrefix([
                    ...medicPrefix, 
                    {id: medicData[0], name: medicData[1], qty: quantity}
                ]);
            }

        } else {
            setmedicPrefix([
                {id: medicData[0], name: medicData[1], qty: quantity}
            ])
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            "data": medicPrefix
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
            setmedicPrefix([])

        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <br/>
            <h2>รับยาเข้าคลัง</h2>
            <div className='input-group mb-3'>
                <span className="input-group-text" id="basic-addon2">รายการ: </span>
                <select 
                    className='form-select' 
                    onChange={(e) => setMedic(e.target.value)}>
                        <option>เลือกรายการที่นี่</option>
                        {data['medic'].map((item) => {
                            return <option key={item.code} value={item.id+','+item.name+'/'+item.unit}>{item.name}/ประเภท({item.unit})</option>
                        })}
                </select>
            </div>
            <div className='input-group mb-3'>
                <span className="input-group-text" id="basic-addon2">จำนวน: </span>
                <input 
                    onChange={e => setQuantity(e.target.value)} 
                    type="text" 
                    className="form-control" 
                    placeholder="..กรอกหน่วยนับที่นี่.." 
                    aria-label="medicunit" 
                    aria-describedby="basic-addon1" 
                />
            </div>
            <button 
                className='btn btn-primary' 
                type='button'
                onClick={() => Prefix(medic, quantity, medicPrefix, setmedicPrefix)}>
                    เพิ่มข้อมูล
            </button>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>ชื่อรายการ/ประเภท</th>
                        <th>จำนวน</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {medicPrefix.map((item, index) => {
                       return ( 
                        <tr key={index+''+item.id}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>
                                <button 
                                className='btn btn-danger'
                                onClick={() => {
                                    setmedicPrefix(medicPrefix.filter((_, i) => i !== index));
                                }}>
                                    ลบ
                                </button>
                            </td>
                        </tr>
                       )
                    })}
                </tbody>
            </table>
            <button className='btn btn-success' onClick={handleSubmit}>ยืนยัน</button>
            {message && <p>{message}</p>}

        </>
    )
}

export default Receive