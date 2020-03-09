import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './css/App.css'
import { getStartDate } from '../common/js/fp'
 
import DefaultHeader from '../common/DefaultHeader'
import DepartDate from './DepartDate'
import HeighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'
import DeteSelector from '../common/DateSelector'

import{
    exchangeFromTo,
    showCitySeletor,
    hideCitySeletor,
    getCityData,
    setSelectedCity,
    showDateSelect,
    hideDateSelect,
    setSelectDate,
    toggleHighSpeed
} from './store/actions'

function App(props){
    const { 
        from, 
        to, 
        isCitySelectorVisible, 
        cityData, 
        isLoadingCityData, 
        departDate,
        isDateSelectotVisible,
        highSpeed
    } = props.state

    const { dispatch } = props
    
    const onBack = useCallback(
        () => {
            window.history.back()
        },
    []);

    const cb = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySeletor
        }, dispatch)
    }, [])

    const cityCb = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySeletor,
            getCityData,
            selectCity: setSelectedCity
        }, dispatch)
    }, [])

    const dateCb = useMemo(() => {
        return bindActionCreators({
            clickDate: showDateSelect
        }, dispatch)
    }, [])

    const dateSelectorCb = useMemo(() => {
        return bindActionCreators({
            hideDateSelect,
            onBack
        }, dispatch)
    }, [])

    const onSelectDate = useCallback((day) => {
        console.log('day', new Date(day))
        if(!day || day < getStartDate()){
            return;
        }
        dispatch(setSelectDate(day))
        dispatch(hideDateSelect())        
    }, [])

    const highSpeedCd = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed
        }, dispatch)
    }, [])

    return(
        <div>
            <div className="header-wrapper">
                <DefaultHeader title="火车票" />
            </div>
            <form action='/query' className="form">
                <Journey 
                    from={from} 
                    to={to} 
                    {...cb}
                />
                <DepartDate time={departDate} { ...dateCb } />
                <HeighSpeed highSpeed={highSpeed} { ...highSpeedCd } />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...cityCb}
            />
            <DeteSelector 
                show={isDateSelectotVisible} 
                {...dateSelectorCb} 
                onSelect={onSelectDate}
            />
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return {state: state.Index}
    }, 
    function mapDispatchToProps(dispatch) {
        return {dispatch}
    }
)(App);