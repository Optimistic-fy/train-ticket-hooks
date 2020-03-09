import React from 'react'
import './css/DateSelector.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Header from './Header'
import { getStartDate } from '../common/js/fp'

function Day(props){
    const { day, onSelect } = props

    if(!day){
        return <td className="null"></td>
    }

    const classes = [];
    const now = getStartDate()  //获取当前时间

    if(day < now){
        classes.push('disabled')
    }
    //如果是周末
    if([6, 0].includes(new Date(day).getDay())){
        classes.push('weekend')
    }

    // const dateString = now === day ? '今天' : new Date(day).getDate()
    const dateString = new Date(day).getDate()

    return(
        <td className={classnames('every-day', classes)} onClick={() => onSelect(day)}>
            <div>{ dateString }</div>
            {
                now === day ? <span className="today"></span> : ''
            }
        </td>
    )
}

function Week(props){
    const { days, onSelect } = props
    return(
        <tr className="date-table-days">
            { days.map((day, index) => {
                return (
                    <Day key={index} day={day} onSelect={onSelect} />
                )
            }) }
        </tr>
    )
}

function Month(props){
    const { startTimeMonth, onSelect } = props

    //当前月开始日期
    const startDay = new Date(startTimeMonth)
    //当前日期
    const currentDay = new Date(startTimeMonth)

    let days = []
    while(startDay.getMonth() === currentDay.getMonth()){
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1)
    }

    //startDay.getDay()判断第一天是否是周日  将空白补上
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days)

    //给月份后添加空白
    let lastDay = new Date(days[days.length - 1]) 
    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null))

    let weeks = []
    for(let i=0;i<days.length;i++){
        let week = days.slice(i*7, (i+1)*7)
        weeks.push(week)
    }

    return(
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            { startDay.getFullYear() }年{ startDay.getMonth() + 1 }
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week, index) => {
                        return (
                            <Week days={week} key={index} onSelect={onSelect} />
                        )
                    } )
                }
            </tbody>
        </table>
    )
}

function DateSelector(props){
    const { show, onSelect, onBack } = props

    const now = new Date();
    now.setDate(1);  //设置第一天
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const monthSquence = [now.getTime()];
    //获得接下来两个月的值
    now.setMonth(now.getMonth() + 1);
    monthSquence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    monthSquence.push(now.getTime());

    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {
                    monthSquence.map((month) => {
                        return (
                            <Month key={month} startTimeMonth={month} onSelect={onSelect} />
                        )
                    })
                }
            </div>
        </div>
    )
}

Day.prototype = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired
}

Week.prototype = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}

Month.propTypes = {   
    startTimeMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired
}

DateSelector.propTypes = {   
    show: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default DateSelector;