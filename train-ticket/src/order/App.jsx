import React, { useCallback, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './css/App.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import Header from '../common/Header.jsx'
import Detail from '../common/Detail.jsx'
import Account from './Account.jsx'
import Choose from './Choose.jsx'
import Passengers from './Passengers.jsx'
import Ticket from './Ticket.jsx'
import Menu from './Menu.jsx'

import{
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setSeatType,
    setDepartDate,
    setSearchParsed,
    fetchInitial,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    hideMenu,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu
} from './store/actions'

function App(props){
    const { 
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed
    } = props.state

    const { dispatch } = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    useEffect(() => {    //异步解析uri参数
        const queries = URI.parseQuery(window.location.search)

        const { trainNumber, dStation, aStation, type, date } = queries

        dispatch(setDepartStation(dStation))
        dispatch(setArriveStation(aStation))
        dispatch(setTrainNumber(trainNumber))
        dispatch(setSeatType(type))
        dispatch(setDepartDate(dayjs(date).valueOf()))
        dispatch(setSearchParsed(true))
    }, [])

    useEffect(() => {
        if(!searchParsed){
            return
        }

        const url = new URI('/rest/order')
            .setSearch('dStation', departStation)
            .setSearch('aStation', arriveStation)
            .setSearch('type', seatType)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
        dispatch(fetchInitial(url));
    }, [searchParsed, departStation, arriveStation, seatType, departDate])

    const passengersCbs = useMemo(() => {
        return bindActionCreators({
            createAdult,
            createChild,
            removePassenger,
            updatePassenger,
            showGenderMenu,
            showFollowAdultMenu,
            showTicketTypeMenu
        }, dispatch)
    }, [])

    const menuCbs = useMemo(() => {
        return bindActionCreators({
            hideMenu
        }, dispatch)
    }, [])

    const chooseCbs = useMemo(() => {
        return bindActionCreators({
            updatePassenger
        }, dispatch)
    }, [])

    if(!searchParsed){
        return null
    }

    return(
        <div className="app">
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack} />
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
                    <span
                        style={{ display: 'block' }}
                        className="train-icon"
                    ></span>
                </Detail>
            </div>
            <Ticket price={price} type={seatType} />
            <Passengers passengers={passengers} {...passengersCbs} />
            {
                passengers.length > 0 && ( <Choose passengers={passengers} {...chooseCbs} />)
            }
            <Account length={passengers.length} price={price} />
            <Menu show={isMenuVisible} {...menu} {...menuCbs} /> 
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {state: state.Order}
    }, 
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);