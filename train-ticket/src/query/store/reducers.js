import * as Contant from './actionType'
import { getStartDate } from '../../common/js/fp' 
import { ORDER_DEPART, ORDER_DURATION } from '../js/global'

const defaultState = ({
    from: null,
    to: null,
    departDate: getStartDate(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType: ORDER_DEPART,   //车的排序方式
    onlyTickes: false,
    ticketTypes: [],
    checkedTickTypes: {},
    trainTypes: [],
    checkedTrainTypes: {},
    startStations: [],  //出发车站
    checkedStartStation: {},   //选中的触发车站
    arriveStation: [],   //到达车站
    checkedArriveStation: {},  //选中的到达车站
    departTimeStart: 0,   //出发最早时间
    departTimeEnd: 24,   //出发最晚时间
    arriveTimeStart: 0,   //到达最早时间
    arriveTimeEnd: 24,    //到达最晚时间
    isFiltersVisible: false,  //综合筛选
    searchParsed: false
})

export function Query(state = defaultState, action) {
    switch(action.type){
        case Contant.ACTION_SET_FROM:
            return {...state, from: action.payload}
        case Contant.ACTION_SET_TO:
            return {...state, to: action.payload}
        case Contant.ACTION_SET_DEPART_DATE:
            return {...state, departDate: action.payload}
        case Contant.ACTION_SET_HIGH_SPEED:
            const highSpeed = action.payload
            const newCheckedTrainTypes = {...state}

            if(highSpeed){
                newCheckedTrainTypes.checkedTrainTypes[1] = true
                newCheckedTrainTypes.checkedTrainTypes[5] = true
            }else{
                delete newCheckedTrainTypes.checkedTrainTypes[1]
                delete newCheckedTrainTypes.checkedTrainTypes[5]
            }
            return {...newCheckedTrainTypes, highSpeed: action.payload};
        case Contant.ACTION_SET_TRAIN_LIST:
            return {...state, trainList: action.payload}
        case Contant.ACTION_SET_ORDER_TYPE:
            return {...state, orderType: action.payload}
        case Contant.ACTION_SET_ONLY_TICKETS:
            return {...state, onlyTickes: action.payload}
        case Contant.ACTION_SET_TICKET_TYPES:
            return {...state, ticketTypes: action.payload}
        case Contant.ACTION_SET_CHECKED_TICKET_TYPES:
            return {...state, checkedTickTypes: action.payload}
        case Contant.ACTION_SET_TRAIN_TYPES:
            return {...state, trainTypes: action.payload}
        case Contant.ACTION_SET_CHECKED_TRAIN_TYPES:
            const payload = action.payload
            let ishighSpeed
            if(payload[1] && payload[5]){
                ishighSpeed = true
            }else{
                ishighSpeed = false
            }
            return {...state, checkedTrainTypes: action.payload, highSpeed: ishighSpeed}
        case Contant.ACTION_SET_DEPART_STATIONS:
            return {...state, startStations: action.payload}
        case Contant.ACTION_SET_CHECKED_DEPART_STATIONS:
            return {...state, checkedstartStation: action.payload}
        case Contant.ACTION_SET_ARRIVE_STATIONS:
            return {...state, arriveStation: action.payload}
        case Contant.ACTION_SET_CHECKED_ARRIVE_STATIONS:
            return {...state, checkedArriveStation: action.payload}
        case Contant.ACTION_SET_DEPART_TIME_START:
            return {...state, departTimeStart: action.payload}
        case Contant.ACTION_SET_DEPART_TIME_END:
            return {...state, departTimeEnd: action.payload}
        case Contant.ACTION_SET_ARRIVE_TIME_START:
            return {...state, arriveTimeStart: action.payload}
        case Contant.ACTION_SET_ARRIVE_TIME_END:
            return {...state, arriveTimeEnd: action.payload}
        case Contant.ACTION_SET_IS_FILTERS_VISIBLE:
            return {...state, isFiltersVisible: action.payload}
        case Contant.ACTION_SET_SEARCH_PARSED:
            return {...state, searchParsed: action.payload}
        default :
            return state;
    }
}
