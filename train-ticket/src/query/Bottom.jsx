import React, { memo, useState, useCallback, useMemo } from 'react'
import './css/Bottom.css'
import PropTypes from 'prop-types'
import { ORDER_DEPART } from './js/global'
import classnames from 'classnames'

import Slider from './Slider.jsx'

const Filter = memo(function Filter(props){
    const { name, checked, toggle, value } = props
    return(
        <li className={classnames({ checked })} onClick={() => toggle(value)}>
            { name }
        </li>
    )
})

const Option = memo(function Option(props){
    const { title, options, checkedMap, update } = props

    const toggle = useCallback((value) => {
        const newCheckedMap = {...checkedMap}

        if(value in checkedMap){
            delete newCheckedMap[value]
        }else{
            newCheckedMap[value] = true
        }

        update(newCheckedMap)
    }, [checkedMap, update])

    return(
        <div className="option">
            <h3>{ title }</h3>
            <ul>
                {
                    options ? options.map(option => {
                        return (
                            <Filter 
                                key={option.value} 
                                { ...option } 
                                checked={option.value in checkedMap}
                                toggle={toggle}
                            />
                            )
                    }) : ''
                }
            </ul>
        </div>
    )
})

const BottomModal = memo(function BottomModal(props){
    const {
        toggleIsFiltersVisible,
        trainType,
        ticketType,
        startStations,
        arriveStation,
        checkedTickTypes,
        checkedTrainTypes,
        checkedStartStation,
        checkedArriveStation,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd
    } = props

    const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
        return {...checkedTickTypes}
    });
    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
        return {...checkedTrainTypes}
    });
    const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {
        return {...checkedStartStation}
    });
    const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {
        return {...checkedArriveStation}
    });

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketType,
            checkedMap: localCheckedTicketTypes,
            update: setLocalCheckedTicketTypes
            // dispatch: localCheckedTicketTypesDispatch,
        },
        {
            title: '车次类型',
            options: trainType,
            checkedMap: localCheckedTrainTypes,
            update: setLocalCheckedTrainTypes
            // dispatch: localCheckedTrainTypesDispatch,
        },
        {
            title: '出发车站',
            options: startStations,
            checkedMap: localCheckedDepartStations,
            update: setLocalCheckedDepartStations
            // dispatch: localCheckedDepartStationsDispatch,
        },
        {
            title: '到达车站',
            options: arriveStation,
            checkedMap: localCheckedArriveStations,
            update: setLocalCheckedArriveStations
            // dispatch: localCheckedArriveStationsDispatch,
        },
    ];

    function clickSure(){
        setCheckedTrainTypes(localCheckedTrainTypes)
        setCheckedTicketTypes(localCheckedTicketTypes)
        setCheckedDepartStations(localCheckedDepartStations)
        setCheckedArriveStations(localCheckedArriveStations)

        //滑块
        setDepartTimeStart(localDepartTimeStart)
        setDepartTimeEnd(localDepartTimeEnd)

        setArriveTimeStart(localArriveTimeStart)
        setArriveTimeEnd(localArriveTimeEnd)

        toggleIsFiltersVisible()
    }

    //判断重置按钮是否可点击
    const isResetDisabled = useMemo(() => {
        return (
            Object.keys(localCheckedTicketTypes).length === 0 &&
            Object.keys(localCheckedTrainTypes).length === 0 &&
            Object.keys(localCheckedDepartStations).length === 0 &&
            Object.keys(localCheckedArriveStations).length === 0 &&
            localDepartTimeStart === 0 &&
            localDepartTimeEnd === 24 &&
            localArriveTimeStart === 0 &&
            localArriveTimeEnd === 24
        );
    }, [
        localCheckedTicketTypes,
        localCheckedTrainTypes,
        localCheckedDepartStations,
        localCheckedArriveStations,
        localDepartTimeStart,
        localDepartTimeEnd,
        localArriveTimeStart,
        localArriveTimeEnd,
    ]);

    function clickReset(){
        if (isResetDisabled) {
            return;
        }

        setLocalCheckedTicketTypes({})
        setLocalCheckedTrainTypes({})
        setLocalCheckedDepartStations({})
        setLocalCheckedArriveStations({})

        //滑块
        setLocalDepartTimeStart(0)
        setLocalDepartTimeEnd(24)

        setLocalArriveTimeStart(0)
        setLocalArriveTimeEnd(24)
    }

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span 
                            className={classnames('reset', {
                                disabled: isResetDisabled
                            })} 
                            onClick={ clickReset }
                        >重置</span>
                        <span className="ok" onClick={ clickSure }>确定</span>
                    </div>
                    <div className="options">
                        {
                            optionGroup.map(group => {
                                console.log('group', group)
                                return (
                                    <Option { ...group } key={ group.title } />
                                )
                            })
                        }
                        <Slider
                            title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChange={setLocalDepartTimeStart}
                            onEndChange={setLocalDepartTimeEnd}
                        />
                        <Slider
                            title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChange={setLocalArriveTimeStart}
                            onEndChange={setLocalArriveTimeEnd}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

function Bottom(props){
    const  { 
        highSpeed, 
        orderType, 
        onlyTickes, 
        isFiltersVisible,
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        trainType,
        ticketType,
        startStations,
        arriveStation,
        checkedTickTypes,
        checkedTrainTypes,
        checkedStartStation,
        checkedArriveStation,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd
    } = props

    //弹出框是否选择值
    const noChecked = Object.keys(checkedTickTypes).length === 0 &&
                      Object.keys(checkedTrainTypes).length === 0 &&
                      Object.keys(checkedStartStation).length === 0 &&
                      Object.keys(checkedArriveStation).length === 0 &&
                      departTimeStart === 0 &&
                      departTimeEnd === 24 &&
                      arriveTimeStart === 0 &&
                      arriveTimeEnd === 24;

    return(
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
                </span>
                <span
                    className={classnames('item', { 'item-on': highSpeed })}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
                <span
                    className={classnames('item', { 'item-on': onlyTickes })}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{onlyTickes ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
                <span
                    className={classnames('item', {
                        'item-on': isFiltersVisible || !noChecked
                    })}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className="icon">{noChecked ? '\uf0f7' : '\uf446'}</i>
                    综合筛选
                </span>
                {
                    isFiltersVisible && (
                        <BottomModal
                            trainType={trainType}
                            ticketType={ticketType}
                            startStations={startStations}
                            arriveStation={arriveStation}
                            checkedTickTypes={checkedTickTypes}
                            checkedTrainTypes={checkedTrainTypes}
                            checkedStartStation={checkedStartStation}
                            checkedArriveStation={checkedArriveStation}
                            departTimeStart={departTimeStart}
                            departTimeEnd={departTimeEnd}
                            arriveTimeStart={arriveTimeStart}
                            arriveTimeEnd={arriveTimeEnd}
                            setCheckedTicketTypes={setCheckedTicketTypes}
                            setCheckedTrainTypes={setCheckedTrainTypes}
                            setCheckedDepartStations={setCheckedDepartStations}
                            setCheckedArriveStations={setCheckedArriveStations}
                            setDepartTimeStart={setDepartTimeStart}
                            setDepartTimeEnd={setDepartTimeEnd}
                            setArriveTimeStart={setArriveTimeStart}
                            setArriveTimeEnd={setArriveTimeEnd}
                            toggleIsFiltersVisible={toggleIsFiltersVisible}
                        />
                    )
                }
            </div>
        </div>
    )
}


Filter.prototype = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
}

Option.prototype = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    checkedMap: PropTypes.object.isRequired,
    update:  PropTypes.func.isRequired
}

BottomModal.prototype = {
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    trainType: PropTypes.array.isRequired,
    ticketType: PropTypes.array.isRequired,
    startStations: PropTypes.array.isRequired,
    arriveStation: PropTypes.array.isRequired,
    checkedTickTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedStartStation: PropTypes.object.isRequired,
    checkedArriveStation: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired
}

Bottom.prototype = {
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickes: PropTypes.bool.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    trainType: PropTypes.array.isRequired,
    ticketType: PropTypes.array.isRequired,
    startStations: PropTypes.array.isRequired,
    arriveStation: PropTypes.array.isRequired,
    checkedTickTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedStartStation: PropTypes.object.isRequired,
    checkedArriveStation: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired
}

export default Bottom;