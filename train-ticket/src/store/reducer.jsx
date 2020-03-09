//combineReducers将小的reducer合并
import { combineReducers } from 'redux'
import { Index } from '../index/store/reducers'
import { Query } from '../query/store/reducers'
import { Ticket } from '../ticket/store/reducers'
import { Order } from '../order/store/reducers'

const reducer = combineReducers({
    Index,
    Query,
    Ticket,
    Order
});
export default reducer;