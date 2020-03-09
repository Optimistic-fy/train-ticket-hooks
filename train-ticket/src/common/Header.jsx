import React from 'react'
import './css/Header.css'
import PropTypes from 'prop-types'

function Header(props){
    const { onBack, title } = props
    return (
        <div className="header">
            <div className="header-back" onClick={onBack}>
                <svg width="42" height="42">
                    <polyline
                        points="25,13 16,21 25,29"
                        stroke="#fff"
                        strokeWidth="2"
                        fill="none"
                    />
                </svg>
            </div>
            <h1 className="header-title">
                {title}
            </h1>
        </div>
    )
}

Header.propTypes = {   //propTypes和prop-types的命名不能一样
    onBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

export default Header;