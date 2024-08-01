import React, { useState, useEffect } from 'react';

function NewMedic() {

    return(
        <>
            <br />
            <div className="input-group mb-3" >
                <span className="input-group-text" id="basic-addon2">รหัสยา: </span>
                <input type="text" className="form-control" placeholder="..กรอกรหัสยาที่นี่.." aria-label="medicssid" aria-describedby="basic-addon2" />
            </div>
            <div className="input-group mb-3" >
                <span className="input-group-text" id="basic-addon1">ชื่อยา: </span>
                <input type="text" className="form-control" placeholder="..กรอกชื่อยาที่นี่.." aria-label="medicname" aria-describedby="basic-addon1" />
            </div>

            <h3>ตารางแสดงรายการ</h3>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>รหัสยา</th>
                            <th>ชื่อยา</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default NewMedic