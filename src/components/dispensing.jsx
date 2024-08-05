import React, { useState, useEffect } from 'react';

function Dispensing() {
    return (
        <>  
            <br />
            <div class="form-check">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                    Default radio
                </label>
            </div>

            <div class="form-check">
                <input 
                    class="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    id="flexRadioDefault2" 
                    checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                    Default checked radio
                </label>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">รหัส</span>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="....กรอกรหัสที่นี่...." 
                    aria-label="identify" 
                    aria-describedby="basic-addon1"
                />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon2">รายการ</span>
                <select 
                    name="" 
                    id=""
                    className='form-control'
                >
                    <option>เลือกรายการที่นี่</option>
                </select>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">จำนวน</span>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="....กรอกจำนวนที่นี่...." 
                    aria-label="identify" 
                    aria-describedby="basic-addon3"
                />
            </div>

            <button className='btn btn-primary'>เพิ่มข้อมูล</button>
        </>
    )
}

export default Dispensing