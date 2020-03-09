import React from 'react'
import './css/Header.css'
import PropTypes from 'prop-types'

function DefaultHeader(props){
    const { title } = props
    return (
        <div className="header">
            <h1 className="header-title">
                {title}
            </h1>
        </div>
    )
}

DefaultHeader.propTypes = { 
    title: PropTypes.string.isRequired
}

export default DefaultHeader;