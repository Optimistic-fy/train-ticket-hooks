import * as Contant from './actionType'
import axios from 'axios'

export function setFrom(from){
    return {
        type: Contant.ACTION_SET_FROM,
        payload: from
    }
}
export function setTo(to){
    return {
        type: Contant.ACTION_SET_TO,
        payload: to
    }
}
export function toggleHighSpeed(){
    return (dispatch, getState) => {
        const { highSpeed } = getState().Index
        dispatch({
            type: Contant.ACTION_SET_HIGH_SPEED,
            payload: !highSpeed
        })
    }
}
export function showCitySeletor(currentSelectingLeftCity){
    return (dispatch) => {
        dispatch({
            type: Contant.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true
        })

        dispatch({
            type: Contant.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity
        })
    }
}
export function hideCitySeletor(){
    return {
        type: Contant.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false
    }
}
export function setCityData(payload){
    return {
        type: Contant.ACTION_SET_CITY_DATA,
        payload
    }
}
export function setLoadingCityData(payload){
    return {
        type: Contant.ACTION_SET_IS_LOADING_CITY_DATA,
        payload
    }
}
export function setSelectedCity(city){
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState().Index
        if(currentSelectingLeftCity){
            dispatch(setFrom(city))
        }else{
            dispatch(setTo(city))
        }
        dispatch(hideCitySeletor())
    }
}
export function showDateSelect(){
    return {
        type: Contant.ACTION_SET_IS_DATE_SELECT_VISIBLE,
        payload: true
    }
}
export function hideDateSelect(){
    return {
        type: Contant.ACTION_SET_IS_DATE_SELECT_VISIBLE,
        payload: false
    }
}
export function exchangeFromTo(){
    return (dispatch, getState) => {
        const { from, to } = getState().Index
        dispatch(setFrom(to))
        dispatch(setTo(from))
    }
}
export function setSelectDate(day){
    return{
        type: Contant.ACTION_SET_SELECT_DAY,
        payload: day
    }
}

export function getCityData(){
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState().Index
        if(isLoadingCityData){
            return;
        }
        dispatch(setLoadingCityData(false))

        const cache = JSON.parse(localStorage.getItem('city_data')) || '{}'

        if(cache.expires < Date.now()){
            dispatch(setCityData(cache.data))
            return;
        }

        axios.get('/rest/cities?' + Date.now())
            .then(res => {
                dispatch(setCityData(res.data))
                localStorage.setItem('city_data', JSON.stringify({
                    expires: Date.now() + 1000 * 60 * 60 * 24 * 1,
                    data: res.data
                }))
                dispatch(setLoadingCityData(false))
            }).catch(err => {
                console.log(err)
                dispatch(setLoadingCityData(false))
            })
    }
}