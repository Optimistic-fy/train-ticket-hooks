import React, { useState, useMemo, useRef, useEffect, memo } from 'react'
import './css/Slider.css'
import PropTypes from 'prop-types'
import leftPad from 'left-pad'
import useWinSize from '../common/js/useWinSize'

const Slider = memo(function Slider(props){
    const { 
        title,
        currentStartHours,
        currentEndHours,
        onStartChange,
        onEndChange 
    }=props

    const startHandle = useRef()
    const endHandle = useRef()

    const lastStartX = useRef()
    const lastEndX = useRef()

    const range = useRef()
    const rangeWidth = useRef()

    //获取屏幕宽度
    const winSize = useWinSize()

    //重置时滑块不能回初始位置  用于修改滑块   使其回到初始位置
    const prevCurrentStartHours = useRef(currentStartHours)
    const prevCurrentEndHours = useRef(currentEndHours)

    // 先按百分比设置滑块
    const [start, setStart] = useState(() => currentStartHours / 24 * 100)  
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100)

    //设置滑块时间
    if(prevCurrentStartHours.current !== currentStartHours){
        setStart(currentStartHours / 24 * 100)
        prevCurrentStartHours.current = currentStartHours
    }

    if(prevCurrentEndHours.current !== currentEndHours){
        setEnd(currentEndHours / 24 * 100)
        prevCurrentEndHours.current = currentEndHours
    }

    const startPersent = useMemo(() => {
        if(start >= 100){
            return 100;
        }
        if(start <= 0){
            return 0;
        }
        return start
    }, [start])

    const endPersent = useMemo(() => {
        if(end >= 100){
            return 100;
        }
        if(end <= 0){
            return 0;
        }
        return end
    }, [end])

    // 将百分比转行成小时 用于显示时间
    const startHours = useMemo(() => {
        return Math.round(startPersent * 24 / 100)
    }, [startPersent])

    const endHours = useMemo(() => {
        return Math.round(endPersent * 24 / 100)
    }, [endPersent])

    const startText = useMemo(() => {
        // leftPad(startHours, 2, '0')  给时间补充为两位  左边用0开始
        return leftPad(startHours, 2, '0') + ':00'
    }, [startHours])

    const endText = useMemo(() => {
        return leftPad(endHours, 2, '0') + ':00'
    }, [endHours])

    //获取滑块之间的宽度
    useEffect(() => {
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        )
    }, [winSize.width])

    useEffect(() => {
        //监听滑块移动移动
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );
        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandle.current.addEventListener(
            'touchmove',
            onEndTouchMove,
            false
        );

        return () => {
            //解绑监听
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            );
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            );
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            );
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            );
        }
    })

    function onStartTouchBegin(e){
        const touch = e.targetTouches[0]
        lastStartX.current = touch.pageX
    }

    function onEndTouchBegin(e){
        const touch = e.targetTouches[0]
        lastEndX.current = touch.pageX
    }

    function onStartTouchMove(e){
        const touch = e.targetTouches[0]
        const distance = touch.pageX - lastStartX.current
        lastStartX.current = touch.pageX

        setStart(start => start + (distance / rangeWidth.current) * 100)
    }

    function onEndTouchMove(e){
        const touch = e.targetTouches[0]
        const distance = touch.pageX - lastEndX.current
        lastEndX.current = touch.pageX

        setEnd(end => end + (distance / rangeWidth.current) * 100)
    }

    //传递slider的修改
    useEffect(() => {
        onStartChange(startHours)
    }, [startHours])

    useEffect(() => {
        onEndChange(endHours)
    }, [endHours])

    return(
        <div className="option">
            <h3>{title}</h3>
            <div className="range-slider">
                <div className="slider" ref={ range }>
                    <div className="slider-range" style={{
                        left: startPersent + '%',
                        width: endPersent - startPersent + '%'
                    }}></div>
                    <i ref={startHandle} className="slider-handle" style={{
                        left: startPersent + '%'
                    }}>
                        <span>{ startText }</span>
                    </i>
                    <i ref={endHandle} className="slider-handle" style={{
                        left: endPersent + '%'
                    }}>
                        <span>{ endText }</span>
                    </i>
                </div>
            </div>
        </div>
    )
})

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChange: PropTypes.func.isRequired,
    onEndChange: PropTypes.func.isRequired
}

export default Slider;