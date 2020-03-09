import * as Contant from './actionType'

const defaultState = ({
    departDate: Date.now(),  //出发日期
    arriveDate:Date.now(),  //到达日期
    departTimeStr: null,    //出发时间
    arriveTimeStr: null,    //到达时间
    departStation: null,    //出发车站
    arriveStation: null,    //到达车站
    trainNumber: null,      //列车号
    durationStr: null,      //列车运行时间
    tickets: [],            //列车位置
    isScheduleVisible: false,   //时刻表显示隐藏
    searchParsed: false     //用于控制当所有数据都选择完成之后才进行异步请求
})

export function Ticket(state = defaultState, action) {
    switch(action.type){
        case Contant.ACTION_SET_DEPART_DATE:
            return {...state, departDate: action.payload}
        case Contant.ACTION_SET_ARRIVE_DATE:
            return {...state, arriveDate: action.payload}
        case Contant.ACTION_SET_DEPART_TIME_STR:
            return {...state, departTimeStr: action.payload}
        case Contant.ACTION_SET_ARRIVE_TIME_STR:
            return {...state, arriveTimeStr: action.payload}
        case Contant.ACTION_SET_DEPART_STATION:
            return {...state, departStation: action.payload}
        case Contant.ACTION_SET_ARRIVE_STATION:
            return {...state, arriveStation: action.payload}
        case Contant.ACTION_SET_TRAIN_NUMBER:
            return {...state, trainNumber: action.payload}
        case Contant.ACTION_SET_DURATION_STR:
            return {...state, durationStr: action.payload}
        case Contant.ACTION_SET_TICKETS:
            return {...state, tickets: action.payload}
        case Contant.ACTION_SET_IS_SCHEDULE_VISIBLE:
            return {...state, isScheduleVisible: action.payload}
        case Contant.ACTION_SET_SEARCH_PARSED:
            return {...state, searchParsed: action.payload}
        default :
            return state;
    }
}
