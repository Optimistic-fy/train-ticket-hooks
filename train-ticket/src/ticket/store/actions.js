import * as Contant from './actionType'
import { getStartDate } from '../../common/js/fp'

export function setDepartDate(departDate) {
    return {
        type: Contant.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setArriveDate(arriveDate) {
    return {
        type: Contant.ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: Contant.ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: Contant.ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
export function setDepartStation(departStation) {
    return {
        type: Contant.ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
export function setArriveStation(arriveStation) {
    return {
        type: Contant.ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
export function setTrainNumber(trainNumber) {
    return {
        type: Contant.ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
export function setDurationStr(durationStr) {
    return {
        type: Contant.ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setTickets(tickets) {
    return {
        type: Contant.ACTION_SET_TICKETS,
        payload: tickets,
    };
}
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: Contant.ACTION_SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible,
    };
}
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState().Ticket;

        dispatch(setIsScheduleVisible(!isScheduleVisible));
    };
}
export function setSearchParsed(searchParsed) {
    return {
        type: Contant.ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}
export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState().Ticket;

        dispatch(setDepartDate(getStartDate(departDate) + 86400 * 1000));
    };
}
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState().Ticket;

        dispatch(setDepartDate(getStartDate(departDate) - 86400 * 1000));
    };
}
