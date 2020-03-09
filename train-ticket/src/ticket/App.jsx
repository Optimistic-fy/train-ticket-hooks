import React, { useCallback, useMemo, useEffect, lazy, Suspense} from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import dayjs from 'dayjs'
import './css/App.css'
import { getStartDate } from '../common/js/fp'
import useNav from '../common/js/useNav' 
import Header from '../common/Header'
import Nav from '../common/Nav'
import Detail from '../common/Detail';
import Candidate from './Candidate'
import { bindActionCreators } from 'redux'
import { TrainContext } from './context'
import axios from 'axios'

import{
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setDepartDate,
    setSearchParsed,
    prevDate,
    nextDate,

    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,

    toggleIsScheduleVisible
} from './store/actions'

function App(props){
    const { 
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed   //url是否被解析
    } = props.state

    const { dispatch } = props
    
    const onBack = useCallback(() => {
            window.history.back()
        },[]);

    const Schedule = lazy(() => import('./Schedule') )  //异步组件

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search)
        const { aStation, dStation, date, trainNumber } = queries

        dispatch(setDepartStation(dStation))
        dispatch(setArriveStation(aStation))
        dispatch(setTrainNumber(trainNumber))
        dispatch(setDepartDate(getStartDate(dayjs(date).valueOf())))

        dispatch(setSearchParsed(true))
    }, [])

    useEffect(() => {
        document.title = trainNumber
    }, [trainNumber])

    useEffect(() => {
        if(!searchParsed){
            return;
        }
        const url = new URI('/rest/ticket') 
                    .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
                    .setSearch('trainNumber', trainNumber)
                    .toString();
        axios.get(url).then(res => {
            const { detail, candidates } = res.data
            const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail

            dispatch(setDepartTimeStr(departTimeStr))
            dispatch(setArriveTimeStr(arriveTimeStr))
            dispatch(setArriveDate(arriveDate))
            dispatch(setDurationStr(durationStr))
            dispatch(setTickets(candidates))
        })
    }, [searchParsed, departDate, trainNumber])

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(departDate, dispatch, prevDate, nextDate)

    const detailCbs = useMemo(() => {
        return bindActionCreators({
            toggleIsScheduleVisible,
        },dispatch);
    }, []);
    
    if(!searchParsed){
        return null;
    }
   
    return(
        <div className="app">
            <div className="header-wrapper">
                <Header title={trainNumber} onBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <Nav 
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}
                    next={next}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                >
                    <span className="left"></span>
                    <span
                        className="schedule"
                        onClick={() => detailCbs.toggleIsScheduleVisible()}
                    >
                        时刻表
                    </span>
                    <span className="right"></span>
                </Detail>
            </div>
            <TrainContext.Provider   //直接将值传递给孙子组件
                value={{
                    trainNumber,
                    departStation,
                    arriveStation,
                    departDate,
                }}
            >
                <Candidate tickets={tickets} />
            </TrainContext.Provider>
            {isScheduleVisible && (
                <div
                    className="mask"
                    onClick={() => dispatch(toggleIsScheduleVisible())}
                >
                    <Suspense fallback={<div>loading</div>}>
                        <Schedule
                            date={departDate}
                            trainNumber={trainNumber}
                            departStation={departStation}
                            arriveStation={arriveStation}
                        />
                    </Suspense>
                </div>
            )}
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {state: state.Ticket}
    }, 
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);