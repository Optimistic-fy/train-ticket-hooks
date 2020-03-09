import * as Contant from './actionType'

const defaultState = ({
    trainNumber: null,
    departStation: null,    //出发车站
    arriveStation: null,    //到达车站
    seatType: null,         //作为等级  一等  二等  站
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,    //出发日期
    arriveTimeStr: null,    //到达日期
    durationStr: null,      //时间
    price: null,            //票价
    passengers: [],         //乘客信息
    menu: null,             //弹出菜单
    isMenuVisible: false,   
    searchParsed: false     //url是否解析完成
})

export function Order(state = defaultState, action) {
    switch(action.type){
        case Contant.ACTION_SET_TRAIN_NUMBER:
            return {...state, trainNumber: action.payload}
        case Contant.ACTION_SET_DEPART_STATION:
            return {...state, departStation: action.payload}
        case Contant.ACTION_SET_ARRIVE_STATION:
            return {...state, arriveStation: action.payload}
        case Contant.ACTION_SET_SEAT_TYPE:
            return {...state, seatType: action.payload}
        case Contant.ACTION_SET_DEPART_DATE:
            return {...state, departDate: action.payload}
        case Contant.ACTION_SET_ARRIVE_DATE:
            return {...state, arriveDate: action.payload}
        case Contant.ACTION_SET_DEPART_TIME_STR:
            return {...state, departTimeStr: action.payload}
        case Contant.ACTION_SET_ARRIVE_TIME_STR:
            return {...state, arriveTimeStr: action.payload}
        case Contant.ACTION_SET_DURATION_STR:
            return {...state, durationStr: action.payload}
        case Contant.ACTION_SET_PRICE:
            return {...state, price: action.payload}
        case Contant.ACTION_SET_PASSENGERS:
            return {...state, passengers: action.payload}
        case Contant.ACTION_SET_MENU:
            return {...state, menu: action.payload}
        case Contant.ACTION_SET_IS_MENU_VISIBLE:
            return {...state, isMenuVisible: action.payload}
        case Contant.ACTION_SET_SEARCH_PARSED:
            return {...state, searchParsed: action.payload}
        default :
            return state;
    }
}
