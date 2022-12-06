import React, { useEffect, useRef, useState } from 'react';
import f5 from '../f5.png';
import f6 from '../f6.png';
import f7 from '../f7.png';
import f8 from '../f8.png';
const Filter = (params) => {
    const { output, crop } = params
    const [src, setSrc] = useState()

    const obj = { f5: f5, f6: f6, f7: f7, f8: f8 }
    const applyFilter = (e) => {
        setSrc(`${obj[e.target.className]}`);
    }

    const removeFilter = () => {
        setSrc()
    }

    return (
        <div>
            <h1>Apply Filters*</h1>
            <div className='input-group m-3'>
                {output && <div style={{ background: `url(${output}) no-repeat`, width: crop.width, height: crop.height}} className='filter'>
                    {src && <img style={{ width: crop.width, height: crop.height }} className="image" src={src} alt="" />}

                </div>}
            </div>
            <div style={{marginBottom:"2rem"}} className='filter-btn input-group'>
                <button onBlur={removeFilter} onClick={applyFilter} className='f5'></button>
                <button onBlur={removeFilter} onClick={applyFilter} className='f6'></button>
                <button onBlur={removeFilter} onClick={applyFilter} className='f7'></button>
                <button onBlur={removeFilter} onClick={applyFilter} className='f8'></button>
            </div>

            <div style={{ textAlign: "center" }}>
                <span>*Use on Desktop Only For Now</span>
            </div>
        </div>


    )

}

export default Filter