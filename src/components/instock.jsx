import React, { useState, useEffect } from 'react';

function Instock() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/instock');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;
    
    return (
        <table className='table'>
            <thead>
                <tr>
                    {data['title'].map((item) => {
                        return <th key={item}>{item}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                    {data['instock'].map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default Instock