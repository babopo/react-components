import React, { useState} from 'react'
import './InputNumber.css'


/**
 * props
 * min最小值 max最大值 defaultValue onChange
 */
function InputNumber(props) {
    const [val, setVal] = useState(props.defaultValue)
    const [temp, setTemp] = useState(props.defaultValue)
    const [up, setUp] = useState({
        height: 15,
        lineHeight: '5px',
    })
    const [down, setDown] = useState({
        height: 15,
        lineHeight: '15px',
    })
    function add() {
        if(val < props.max) {
            setVal(val + 1)
            props.onChange(val + 1)
        } else {
            // 不用考虑设置回去，因为上下按钮的点击处理机已经去掉这项了
            setUp({
                ...up,
                cursor: 'not-allowed'
            })
        }
    }
    function min() {
        if(val > props.min) {
            setVal(val - 1)
            props.onChange(val - 1)
        } else {
            setDown({
                ...down,
                cursor: 'not-allowed'
            })
        }
    }
    function store() {
        setTemp(val)
    }
    function inputVal(e) {
        setVal(e.target.value)
    }
    function retrive() {
        let curr = +val
        if(Number.isNaN(curr)) {
            setVal(temp)
            props.onChange(temp)
        } else if(curr > props.max) {
            setVal(props.max)
            props.onChange(props.max)
        } else if(curr < props.min) {
            setVal(props.min)
            props.onChange(props.min)
        } else {
            props.onChange(val)
        }
    }
    function upGrow() {
        setUp({
            height: 20,
            lineHeight: '20px',
        })
        setDown({
            height: 10,
            lineHeight: '10px',
        })
    }
    function upShrink() {
        setUp({
            height: 15,
            lineHeight: '15px',
        })
        setDown({
            height: 15,
            lineHeight: '15px',
        })        
    }
    function downGrow() {
        setDown({
            height: 20,
            lineHeight: '20px',
        })
        setUp({
            height: 10,
            lineHeight: '10px',
        })
    }
    function downShrink() {
        setUp({
            height: 15,
            lineHeight: '15px',
        })
        setDown({
            height: 15,
            lineHeight: '15px',
        })
    }
    return (
        <div className="IN-container">
            <input className="IN-input" value={val} onFocus={store} onBlur={retrive} onChange={inputVal} />
            <div className="IN-btn-box">
                <div className="IN-up" style={{...up}} onClick={add} onMouseEnter={upGrow} onMouseLeave={upShrink}><i className="fa fa-angle-up" aria-hidden="true" /></div>
                <div className="IN-down" style={{...down}} onClick={min} onMouseEnter={downGrow} onMouseLeave={downShrink}><i className="fa fa-angle-down" aria-hidden="true" /></div>
            </div>
        </div>
    )
}

export default InputNumber