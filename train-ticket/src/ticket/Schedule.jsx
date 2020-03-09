import React, { memo, useState, useEffect } from 'react'
import './css/Schedule.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import leftPad from 'left-pad'
import URI from 'urijs'
import dayjs from 'dayjs'
import axios from 'axios'

const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,
        arriveTime,
        departTime,
        stay,

        isStartStation,
        isEndStation,
        isDepartStation,
        isArriveStation,
        beforeDepartStation,
        afterArriveStation
    } = props
    return(
        <li>
            <div className={classnames('icon', {
                'icon-red': isDepartStation || isArriveStation 
            })}>
                {
                    isDepartStation ? '出' : isArriveStation ? '到' : leftPad(index, 2, 0)
                }
            </div>
            <div className={classnames('row', {
                    grey: beforeDepartStation || afterArriveStation,
                })}
            >
                <span className={classnames('station', {
                        red: isArriveStation || isDepartStation,
                    })}
                >
                    {station}
                </span>
                <span className={classnames('arrtime', {
                        red: isArriveStation,
                    })}
                >
                    {isStartStation ? '始发站' : arriveTime}
                </span>
                <span className={classnames('deptime', {
                        red: isDepartStation,
                    })}
                >
                    {isEndStation ? '终到站' : departTime}
                </span>
                <span className="stoptime">
                    {isStartStation || isEndStation ? '-' : stay + '分'}
                </span>
            </div>
        </li>
    )
})

const Schedule = memo(function Schedule(props){
    const { date, trainNumber, departStation, arriveStation } = props

    const [scheduleList, setScheduleList] = useState([])

    useEffect(() => {
        const url = new URI('/rest/schedule')
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation)
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
            .toString()
        axios.get(url).then(res => {
            console.log('res', res)
            let departRow,   //出发车站
                arriveRow   //到达车站
            for (let i = 0; i < res.data.length; i++) {
                if(!departRow){
                    if(res.data[i].station === departStation){  //当前车站是出发车站
                        departRow = Object.assign(res.data[i], {
                            beforeDepartStation: false,
                            isDepartStation: true,
                            afterArriveStation: false,
                            isArriveStation: false
                        })
                    }else{
                        Object.assign(res.data[i], {    //不是当前车站  为出发地前的车站
                            beforeDepartStation: true,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: false
                        })
                    }
                }else if(!arriveRow){
                    if (res.data[i].station === arriveStation) {   //当前车站是到达车站
                        arriveRow = Object.assign(res.data[i], {
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: true,
                        });
                    } else {
                        Object.assign(res.data[i], {    //当前车站是中途经过的车站
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: false,
                        });
                    }
                }else{
                    Object.assign(res.data[i], {   //当前车站是到达车站后的车站
                        beforeDepartStation: false,
                        isDepartStation: false,
                        afterArriveStation: true,
                        isArriveStation: false,
                    });
                }
                Object.assign(res.data[i], {
                    isStartStation: i === 0,                //始发站
                    isEndStation: i === res.data.length - 1,    //终点站
                });
            }
            setScheduleList(res.data)
        })
    }, [date, trainNumber, departStation, arriveStation])

    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="deptime">到达</span>
                    <span className="arrtime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {scheduleList.map((schedule, index) => {
                        return (
                            <ScheduleRow
                                key={schedule.station}
                                index={index + 1}
                                {...schedule}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    )
})

Schedule.propTypes = { 
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired
}

export default Schedule;