import * as Contant from './actionType'
import axios from 'axios'

export function setTrainNumber(trainNumber) {
    return {
        type: Contant.ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
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
export function setSeatType(seatType) {
    return {
        type: Contant.ACTION_SET_SEAT_TYPE,
        payload: seatType,
    };
}
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
export function setDurationStr(durationStr) {
    return {
        type: Contant.ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setPrice(price) {
    return {
        type: Contant.ACTION_SET_PRICE,
        payload: price,
    };
}
export function setPassengers(passengers) {
    return {
        type: Contant.ACTION_SET_PASSENGERS,
        payload: passengers,
    };
}
export function setMenu(menu) {
    return {
        type: Contant.ACTION_SET_MENU,
        payload: menu,
    };
}
export function setIsMenuVisible(isMenuVisible) {
    return {
        type: Contant.ACTION_SET_IS_MENU_VISIBLE,
        payload: isMenuVisible,
    };
}
export function setSearchParsed(searchParsed) {
    return {
        type: Contant.ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

export function fetchInitial(url) {
    return (dispatch, getState) => {
        axios.get(url).then(res => {
                const { departTimeStr, arriveTimeStr, arriveDate, durationStr, price } = res.data;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setPrice(price));
            });
    };
}

let passengerIdSeed = 0;

export function createAdult() {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        for (let passenger of passengers) {   //检查乘客的信息是否有未填写的  如果有则不能在次进行添加
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }
        }

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    ticketType: 'adult',
                    licenceNo: '',  //身份证号
                    seat: 'Z',  //座位
                },
            ])
        );
    };
}

export function createChild() {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        let adultFound = null;

        for (let passenger of passengers) {//检查乘客的信息是否有未填写的  如果有则不能在次进行添加
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }

            if (passenger.ticketType === 'adult') {
                adultFound = passenger.id;
            }
        }

        if (!adultFound) {//没有找到任何成人
            alert('请至少正确添加一个同行成人');
            return;
        }

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id: ++passengerIdSeed,
                    name: '',
                    gender: 'none', //性别
                    birthday: '',
                    followAdult: adultFound,
                    ticketType: 'child',
                    seat: 'Z',
                },
            ])
        );
    };
}

export function removePassenger(id) {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        const newPassengers = passengers.filter(passenger => {
            return passenger.id !== id && passenger.followAdult !== id;
        });

        dispatch(setPassengers(newPassengers));
    };
}

export function updatePassenger(id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [...passengers];
                newPassengers[i] = Object.assign({}, passengers[i], data);

                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengers(newPassengers));

                break;
            }
        }
    };
}

export function showMenu(menu) {
    return dispatch => {
        dispatch(setMenu(menu));
        dispatch(setIsMenuVisible(true));
    };
}

export function hideMenu() {
    return setIsMenuVisible(false);
}

export function showGenderMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(gender) {
                    dispatch(updatePassenger(id, { gender }));
                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '男',
                        value: 'male',
                        active: 'male' === passenger.gender,
                    },
                    {
                        title: '女',
                        value: 'female',
                        active: 'female' === passenger.gender,
                    },
                ],
            })
        );
    };
}

export function showFollowAdultMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(followAdult) {
                    dispatch(updatePassenger(id, { followAdult }));
                    dispatch(hideMenu());
                },
                options: passengers
                    .filter(passenger => passenger.ticketType === 'adult')
                    .map(adult => {
                        return {
                            title: adult.name,
                            value: adult.id,
                            active: adult.id === passenger.followAdult,
                        };
                    }),
            })
        );
    };
}

export function showTicketTypeMenu(id) {
    return (dispatch, getState) => {
        const { passengers } = getState().Order;

        const passenger = passengers.find(passenger => passenger.id === id);

        if (!passenger) {
            return;
        }

        dispatch(
            showMenu({
                onPress(ticketType) {
                    if ('adult' === ticketType) {     //儿童票转换成成人票
                        dispatch(
                            updatePassenger(
                                id,    //添加的字段
                                {
                                    ticketType,
                                    licenceNo: '',
                                },
                                ['gender', 'followAdult', 'birthday']   //移除的字段
                            )
                        );
                    } else {    //成人票转换成儿童票
                        const adult = passengers.find(
                            passenger =>
                                passenger.id !== id &&
                                passenger.ticketType === 'adult'
                        );

                        if (adult) {
                            dispatch(
                                updatePassenger(
                                    id,   //添加的字段
                                    {
                                        ticketType,
                                        gender: '',
                                        followAdult: adult.id,
                                        birthday: '',
                                    },
                                    ['licenceNo']   //移除的字段
                                )
                            );
                        } else {
                            alert('没有其他成人乘客');
                        }
                    }

                    dispatch(hideMenu());
                },
                options: [
                    {
                        title: '成人票',
                        value: 'adult',
                        active: 'adult' === passenger.ticketType,
                    },
                    {
                        title: '儿童票',
                        value: 'child',
                        active: 'child' === passenger.ticketType,
                    },
                ],
            })
        );
    };
}
