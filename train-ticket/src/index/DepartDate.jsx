import React, { useMemo } from 'react'
import './css/DepartDate.css'
import { getStartDate } from '../common/js/fp'
import DayJs from 'dayjs'
import PropTypes from 'prop-types'

function DepartDate(props){
    const { time, clickDate } = props

    const date = getStartDate(time)
    const departDate = new Date(date)
    const isToday = date === getStartDate()    //getDate()获取当前时间

    const dateString = useMemo(() => {
        return DayJs(date).format('YYYY-MM-DD')
    }, [date])

    const weekString = '周' + ['日','一','二','三','四','五','六'][departDate.getDay()] + [isToday ? '(今天)' : '']
    return (
        <div className="depart-date" onClick={clickDate}>
            <input type="hidden" name="date" value={dateString} />
            { dateString }
            <span className="depart-week">
                { weekString }
            </span>
        </div>
    )
}

DepartDate.prototype = {
    time: PropTypes.number.isRequired,
    clickDate: PropTypes.func.isRequired
}

export default DepartDate;