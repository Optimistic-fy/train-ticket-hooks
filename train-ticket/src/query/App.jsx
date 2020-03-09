import React, { useCallback, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './css/App.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import { getStartDate } from '../common/js/fp'
import axios from 'axios'

import Header from '../common/Header'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

import{
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    setTrainList,
    prevDate,
    nextDate,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
} from './store/actions'

function App(props){
    const { 
       from,
       to,
       trainList,
       departDate,
       highSpeed,
       searchParsed,   //是否解析uri
       orderType,
       onlyTickes,
       checkedTickTypes,
       checkedTrainTypes,
       checkedStartStation,
       checkedArriveStation,
       departTimeStart,
       departTimeEnd,
       arriveTimeStart,
       arriveTimeEnd,
       isFiltersVisible,
       trainTypes,
       ticketTypes,
       startStations, 
       arriveStation
    } = props.state

    const { dispatch } = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {
        const query = URI.parseQuery(window.location.search)
        const { from, to, date, highSpeed} = query

        dispatch(setFrom(from))
        dispatch(setTo(to))
        dispatch(setDepartDate(getStartDate(dayjs(date).valueOf())))
        dispatch(setHighSpeed(highSpeed === 'true'))

        dispatch(setSearchParsed(true))
    }, [])

    useEffect(() => {  //确保拿到uri的参数之后   才发送异步请求
        if(!searchParsed){
            return;
        }
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickes)
            .setSearch(
                'checkedTicketTypes',
                Object.keys(checkedTickTypes).join()   //将对象转换成字符串
            )
            .setSearch(
                'checkedTrainTypes',
                Object.keys(checkedTrainTypes).join()
            )
            .setSearch(
                'checkedDepartStations',
                Object.keys(checkedStartStation).join()
            )
            .setSearch(
                'checkedArriveStations',
                Object.keys(checkedArriveStation).join()
            )
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();
        axios.get(url).then(res => {
            const {
                dataMap: {
                    directTrainInfo: {
                        trains,
                        filter: {
                            ticketType,
                            trainType,
                            depStation,
                            arrStation,
                        },
                    },
                }
            } = res.data

            dispatch(setTrainList(trains))
            dispatch(setTicketTypes(ticketType))
            dispatch(setTrainTypes(trainType))
            dispatch(setDepartStations(depStation))
            dispatch(setArriveStations(arrStation))
        }).catch(err => {
            console.log('err', err)
        })
    }, [ from, to, departDate, highSpeed, searchParsed, orderType, onlyTickes, checkedTickTypes, checkedTrainTypes, checkedStartStation, checkedArriveStation, departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd])

    const isPrevDisabled = getStartDate(departDate) <= getStartDate()
    const isNextDisabled = getStartDate(departDate) - getStartDate() > 20 * 86400 * 1000

    const prev = useCallback(() => {
        if(isPrevDisabled){
            return;
        }
        dispatch(prevDate())
    }, [isPrevDisabled])

    const next = useCallback(() => {
        if(isNextDisabled){
            return;
        }
        dispatch(nextDate())
    }, [isNextDisabled])

    const bottomCb = useMemo(() => {
        return bindActionCreators({
            toggleOrderType,
            toggleHighSpeed,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
            setCheckedTicketTypes,
            setCheckedTrainTypes,
            setCheckedDepartStations,
            setCheckedArriveStations,
            setDepartTimeStart,
            setDepartTimeEnd,
            setArriveTimeStart,
            setArriveTimeEnd
        }, dispatch)
    }, [])

    if(!searchParsed){
        return null;
    }

    return(
        <div>
            <div className="header-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
            </div>
            <Nav 
                date={departDate}
                prev={prev}
                next={next}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
            />
            <List list={ trainList } />
            <Bottom 
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickes={onlyTickes}
                isFiltersVisible={isFiltersVisible}
                trainType={trainTypes}
                ticketType={ticketTypes}
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
                { ...bottomCb }
            />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        console.log('state', state)
        return {state: state.Query}
    }, 
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);