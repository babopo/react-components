import React, { useState, useRef, useEffect } from 'react'
import './DatePicker.css'

/**
 * 思路：观察antDesign的原组件，原输入框是单独的input，focus后会渲染一个绝对定位的选择块覆盖在原输入框上，其中包括一个输入框(并不是原来那个)
 * 两个输入框的内容是双向绑定的
 */
function DatePicker(props) {
    const [hiding, setHiding] = useState(true)
    const [val, setVal] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    const [date, setDate] = useState(new Date().getDate())
    const [day, setDay] = useState(new Date().getDay())

    const selectArea = useRef(null)

    function expand() {
        setHiding(false)
    }
    
    function collapse(e) {
        // blur事件在所有react元素上都会触发，而且会冒泡
        console.log(e)
        console.log(e.DOMEventTarget, e.relatedTarget)
        setHiding(true)
    }

    function inputDate(e) {
        setVal(e.target.value)
    }
    useEffect(() => {
        document.addEventListener('click', e => {
            // if(e.target !== )
        })
        if(selectArea.current) {
            selectArea.current.focus()
        }
    })

    return (
        <div className="DP-container">
            <input onFocus={expand} className="DP-input" value={val} placeholder="请选择日期"/>
            { hiding ? null : (
                <div onBlur={collapse} className="DP-selector-container">                  
                    <input className="DP-selector-item" ref={selectArea} value={val} onChange={inputDate} placeholder="请选择日期"/>
                    <div className="DP-selector-item">{year}年{month}月</div>
                    <div className="DP-selector-body">
                        <div className="DP-selector-item">
                            <span>一</span>
                            <span>二</span>
                            <span>三</span>
                            <span>四</span>
                            <span>五</span>
                            <span>六</span>
                            <span>日</span>
                        </div>
                        <div className="DP-selector-item">当月日期展示</div>
                    </div>
                    <div className="DP-selector-item">今天</div>
                </div>) 
            }
        </div>
    )
}

export default DatePicker