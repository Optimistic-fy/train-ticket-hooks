import React, { memo } from 'react'
import './css/Choose.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Choose = memo(function Choose(props){
    const { passengers, updatePassenger } = props

    function createSeat(seatType) {
        return (
            <div>
                {
                    passengers.map(passenger => {
                        return (
                            <p
                                key={passenger.id}
                                className={classnames('seat', {
                                    active: passenger.seat === seatType,
                                })}
                                data-text={seatType}   //字母  css有设置对应字母内容  传递A  B   C   D    F
                                onClick={() =>
                                    updatePassenger(passenger.id, {
                                        seat: seatType
                                    })
                                }
                            >
                                &#xe02d;
                            </p>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div className="choose">
            <div className="choose">
                <p className="tip">在线选座</p>
                <div className="container">
                    <div className="seats">
                        <div>窗</div>
                        {createSeat('A')}
                        {createSeat('B')}
                        {createSeat('C')}
                        <div>过道</div>
                        {createSeat('D')}
                        {createSeat('F')}
                        <div>窗</div>
                    </div>
                </div>
            </div>
        </div>
    )
})

Choose.propTypes = { 
    passengers: PropTypes.array.isRequired,
    updatePassenger: PropTypes.func.isRequired
}

export default Choose;