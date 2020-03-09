import * as Contant from './actionType'
// import axios from 'axios'
import { getStartDate } from '../../common/js/fp'
import { ORDER_DEPART, ORDER_DURATION } from '../js/global'

export function setFrom(from) {
    return {
        type: Contant.ACTION_SET_FROM,
        payload: from,
    };
}
export function setTo(to) {
    return {
        type: Contant.ACTION_SET_TO,
        payload: to,
    };
}
export function setDepartDate(departDate) {
    return {
        type: Contant.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setHighSpeed(highSpeed) {
    return {
        type: Contant.ACTION_SET_HIGH_SPEED,
        payload: highSpeed,
    };
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState().Query;

        dispatch(setHighSpeed(!highSpeed));
    };
}
export function setTrainList(trainList) {
    return {
        type: Contant.ACTION_SET_TRAIN_LIST,
        payload: trainList,
    };
}
export function toggleOrderType() {
    return (dispatch, getState) => {
        const { orderType } = getState().Query;
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: Contant.ACTION_SET_ORDER_TYPE,
                payload: ORDER_DURATION,
            });
        } else {
            dispatch({
                type: Contant.ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART,
            });
        }
    };
}
export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        const { onlyTickes } = getState().Query;

        dispatch({
            type: Contant.ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickes
        });
    };
}
export function setTicketTypes(ticketTypes) {
    return {
        type: Contant.ACTION_SET_TICKET_TYPES,
        payload: ticketTypes,
    };
}
export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: Contant.ACTION_SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes,
    };
}
export function setTrainTypes(trainTypes) {
    return {
        type: Contant.ACTION_SET_TRAIN_TYPES,
        payload: trainTypes,
    };
}
export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: Contant.ACTION_SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes,
    };
}
export function setDepartStations(departStations) {
    return {
        type: Contant.ACTION_SET_DEPART_STATIONS,
        payload: departStations,
    };
}
export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: Contant.ACTION_SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations,
    };
}
export function setArriveStations(arriveStations) {
    return {
        type: Contant.ACTION_SET_ARRIVE_STATIONS,
        payload: arriveStations,
    };
}
export function setCheckedArriveStations(checkedArriveStations) {
    return {
        type: Contant.ACTION_SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations,
    };
}
export function setDepartTimeStart(departTimeStart) {
    return {
        type: Contant.ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart,
    };
}
export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: Contant.ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd,
    };
}
export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: Contant.ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart,
    };
}
export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: Contant.ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd,
    };
}
export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {
        const { isFiltersVisible } = getState().Query;

        dispatch({
            type: Contant.ACTION_SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible,
        });
    };
}
export function setSearchParsed(searchParsed) {
    return {
        type: Contant.ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

export function prevDate() {   //前一天
    return (dispatch, getState) => {
        const { departDate } = getState().Query;

        dispatch(setDepartDate(getStartDate(departDate) - 86400 * 1000));
    };
}

export function nextDate() {  //后一天
    return (dispatch, getState) => {
        const { departDate } = getState().Query;

        dispatch(setDepartDate(getStartDate(departDate) + 86400 * 1000));
    };
}