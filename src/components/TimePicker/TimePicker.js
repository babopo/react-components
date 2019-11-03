import React, {useState, useEffect, useRef} from 'react'
import './TimePicker.css'


/**
 * props
 * 为了方便
 * defaultTime 传入格式为'HH:mm:ss'的时间字符串
 * onChange 获取格式为'HH:mm:ss'的时间字符串
 */
function TimePicker(props) {
    // time: [hour, minutes, second]
    const [time, setTime] = useState(props.defaultTime.split(':'))
    const [tempTime, setTempTime] = useState(props.defaultTime.split(':'))
    const [showing, setShowing] = useState(false)
    const hourBox = useRef()
    const minutesBox = useRef()
    const secondsBox = useRef()
    const hours = []
    const minutes = []
    const seconds = []
    for(let i = 0; i < 24; i++) {
        // 时
        hours.push(<div onClick={selectHour} key={'hours' + i} className={"TP-selector-block" + (i === +time[0] ? ' TP-selected' : '')}>{(i + '').padStart(2, 0)}</div>)
    }
    for(let i = 0; i < 60; i++) {
        // 分
        minutes.push(<div onClick={selectMinutes} key={'minutes' + i} className={"TP-selector-block" + (i === +time[1] ? ' TP-selected' : '')}>{(i + '').padStart(2, 0)}</div>)
    }
    for(let i = 0; i < 60; i++) {
        // 秒
        seconds.push(<div onClick={selectSeconds} key={'seconds' + i} className={"TP-selector-block" + (i === +time[2] ? ' TP-selected' : '')}>{(i + '').padStart(2, 0)}</div>)
    }
    
    useEffect(() => {
        // useEffect是挂载和更新后执行，所以能拿到ref，直接写在同步里反而拿不到
        hourBox.current.scrollTop = time[0] * 30
        minutesBox.current.scrollTop = time[1] * 30
        secondsBox.current.scrollTop = time[2] * 30
    })

    
    function showSelector() {
        setShowing(true)
    }
    function hideSelector() {
        setShowing(false)
    }

    function selectHour(e) {
        const currTime = [e.target.innerText, time[1], time[2]]
        setTime(currTime)
        props.onChange(currTime.join(':'))
    }
    function selectMinutes(e) {
        const currTime = [time[0], e.target.innerText, time[2]]
        setTime(currTime)
        props.onChange(currTime.join(':'))
    }
    function selectSeconds(e) {
        const currTime = [time[0], time[1], e.target.innerText]
        setTime(currTime)
        props.onChange(currTime.join(':'))
    }

    function inputTime(e) {
        setTime(e.target.value.split(':'))
    }

    function store() {
        setTempTime(time)
    }

    function retrive() {
        if(time.some((it, idx) => {
            if(Number.isNaN(+it) || +it < 0) {
                return true
            }
            if(idx === 0 && +it > 23) {
               return true 
            }
            if(idx === 1 && +it > 59) {
               return true 
            }
            if(idx === 2 && +it > 59) {
               return true 
            }
            return false
        })) {
            setTime(tempTime)
        } else {
            props.onChange(time.join(':'))
        }
    }

    return (
        <div className="TP-container">
            <input type="text" className="TP-input" value={time.join(':')} readOnly onFocus={showSelector} />
            
            <div className="TP-selector-container" style={{display: showing ? 'block' : 'none'}} >
                {/* 加一个底层的透明遮罩，若遮罩被点击则收起 */}
                <div className="TP-selector-mask" onClick={hideSelector} />
                <div className="TP-selector-inputbox">
                    <input className="TP-selector-input" onChange={inputTime} onFocus={store} onBlur={retrive} type="text" value={time.join(':')}/>
                    <div className="TP-selector-scrollbox">
                        <div className="TP-selector-scroll" ref={hourBox}>{hours}</div>
                        <div className="TP-selector-scroll" ref={minutesBox}>{minutes}</div>
                        <div className="TP-selector-scroll" ref={secondsBox}>{seconds}</div>
                    </div>
                </div>
            </div>
        </div>
    )
} 


export default TimePicker