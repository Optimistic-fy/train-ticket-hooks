import React, { useMemo, memo } from 'react'
import './css/Nav.css'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const Nav = memo(function Nav(props){
    const { date, prev, next, isPrevDisabled, isNextDisabled } = props

    const currentString = useMemo(() => {
        const day = dayjs(date)
        return day.format('M月D日') + day.locale('zh-cn').format('ddd')
    }, [date])

    return(
        <div className="nav">
            <span 
                onClick={prev}
                className={classnames('nav-prev', {
                    'nav-disabled': isPrevDisabled
                })}
            >
                前一天
            </span>
            <span className="nav-current">
                { currentString }
            </span>
            <span 
                onClick={next}
                className={classnames('nav-next', {
                    'nav-disabled': isNextDisabled
                })}
            >
                后一天
            </span>
        </div>
    )
})

Nav.prototype = {
    date: PropTypes.number.isRequired, 
    pre: PropTypes.func.isRequired, 
    next: PropTypes.func.isRequired, 
    isPrevDisabled: PropTypes.bool.isRequired, 
    isNextDisabled: PropTypes.bool.isRequired
}

export default Nav;