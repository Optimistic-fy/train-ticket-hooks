import * as Contant from './actionType'

const defaultState = ({
    from: '北京',    //出发地
    to: '上海',      //终点
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectotVisible: false,
    highSpeed: false,      //是否选择高铁
    departDate: Date.now()  //选中的日期  默认为当天
})

export function Index(state = defaultState, action) {
    switch(action.type){
        case Contant.ACTION_SET_FROM:
            return {...state, from: action.payload}
        case Contant.ACTION_SET_TO:
            return {...state, to: action.payload}
        case Contant.ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
            return {...state, isCitySelectorVisible: action.payload}
        case Contant.ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
            return {...state, currentSelectingLeftCity: action.payload}
        case Contant.ACTION_SET_CITY_DATA:
            return {...state, cityData: action.payload}
        case Contant.ACTION_SET_SELECT_DAY:
            return {...state, departDate: action.payload}
        case Contant.ACTION_SET_IS_LOADING_CITY_DATA:
            return {...state, isLoadingCityData: action.payload}
        case Contant.ACTION_SET_IS_DATE_SELECT_VISIBLE:
            return {...state, isDateSelectotVisible: action.payload}
        case Contant.ACTION_SET_HIGH_SPEED:
            return {...state, highSpeed: action.payload}
        default :
            return state;
    }
}
