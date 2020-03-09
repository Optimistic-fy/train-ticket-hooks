import React, { memo } from 'react'
import './css/Ticket.css'
import PropTypes from 'prop-types'

const Ticket = memo(function Ticket(props){
    const { price, type } = props

    return (
        <div className="ticket">
            <p>
                <span className="ticket-type">{type}</span>
                <span className="ticket-price">{price}</span>
            </p>
            <div className="label">坐席</div>
        </div>
    )
})

Ticket.propTypes = { 
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string.isRequired
}

export default Ticket;