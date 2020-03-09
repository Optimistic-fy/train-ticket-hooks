import React from 'react'
import './css/Journey.css'
import switchImg from './imgs/switch.svg'

function Journey(props){
    //showCitySelector  true 选择左边   false选择右边
    const { from, to, exchangeFromTo, showCitySeletor } = props
    return (
        <div className="journey">
            <div className="journey-station" onClick={() => showCitySeletor(true)}>
                <input 
                    type="text"
                    readOnly
                    name="from"
                    value={from}
                    className="journey-input journey-from"
                />
            </div>
            <div className="journey-switch" onClick={() => exchangeFromTo()}>
                <img src={switchImg} alt="switch" width="70" height="40" />
            </div>
            <div className="journey-station" onClick={() => showCitySeletor(false)}>
                <input 
                    type="text"
                    readOnly
                    name="to"
                    value={to}
                    className="journey-input journey-to"
                />
            </div>
        </div>
    )
}
export default Journey;