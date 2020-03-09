import React, { memo, useState, useCallback, useMemo, useContext } from 'react'
import './css/Candidate.css'
import PropTypes from 'prop-types'
import URI from 'urijs'
import dayjs from 'dayjs'
import { TrainContext } from './context'

const Channel = memo(function Channel(props){
    const { name, desc, type } = props;

    const { trainNumber, departStation, arriveStation, departDate } = useContext(TrainContext)

    const src = useMemo(() => {
        return new URI('order')
            .setSearch('trainNumber', trainNumber)
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', type)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
    }, [type, trainNumber, departStation, arriveStation, departDate])

    return(
        <div className="channel">
            <div className="middle">
                <div className="name">{name}</div>
                <div className="desc">{desc}</div>
            </div>
            <a href={src} className="buy-wrapper">
                <div className="buy">买票</div>
            </a>
        </div>
    )
})

Channel.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

const Seat = memo(function Seat(props){
    const { type, priceMsg, ticketsLeft, channels, expanded, onToggle, index } = props
    return(
        <li>
            <div className="bar" onClick={() => onToggle(index)}>
                <span className="seat">{type}</span>
                <span className="price">
                    <i>￥</i>
                    {priceMsg}
                </span>
                <span className="btn">{expanded ? '收起' : '预订'}</span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div
                className="channels"
                style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
            >
                {
                    channels.map(channel => {
                        return (
                            <Channel key={channel.name} {...channel} type={type} />
                        );
                    })
                }
            </div>
        </li>
    )
})

Seat.prototype={
    type: PropTypes.string.isRequired,
    priceMsg: PropTypes.string.isRequired,
    ticketsLeft: PropTypes.string.isRequired,
    channels: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

const Candidate = memo(function Candidate(props){
    const { tickets } = props

    const [expenedIndex, setExpenedIndex] = useState(-1)

    const onToggle = useCallback(index => {
        setExpenedIndex(index === expenedIndex ? -1 : index)
    }, [expenedIndex])

    return (
        <div className="candidate">
           <ul>
               {
                   tickets.map((ticket, index) => {
                        return (
                            <Seat 
                                expanded={ expenedIndex === index }    
                                { ...ticket } 
                                key={index} 
                                onToggle={onToggle}
                                index={index}
                                />)
                   })
               }
           </ul>
        </div>
    )
})

Candidate.propTypes = { 
    tickets: PropTypes.array.isRequired
}

export default Candidate;