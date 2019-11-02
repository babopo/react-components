import React, { useState } from 'react'
import './Collapse.css'

/**
 * 传入Panel作为子元素
 * defaultPanel 默认打开的面板
 * onChange返回当前被点击的面板
 */
function Collapse(props) {
    const [checked, setChecked] = useState(props.defaultPanel)
    function getKey(key) {
        props.onChange(key)
        if(key === checked) {
            setChecked(null)
        } else {
            setChecked(key)
        }
    }
    return (
        <div className="C-container">
            {props.children.map(it => <Panel {...it.props}  
                                            onClick={() => getKey(it.key)} 
                                            checked={it.key === checked ? true : false} 
                                            key={it.key}>{it.props.children}</Panel>)}
        </div>
    )
}

/**
 * key 序列
 * props
 * header标题  
 * p标签作为子元素传入内容
 * 
 * onClick 被点击时返回给父元素自己的key
 * checked 表示当前是否应该展开
 */
function Panel(props) {
    function feedBack() {
        props.onClick()
    }
    return (
        <div className="C-item">
            <p className="C-title" onClick={feedBack}><i className={"fa" + (props.checked ? " fa-angle-down" : " fa-angle-right")} aria-hidden="true" />{props.header}</p>
            <div className={"C-content" + (props.checked ? "" : " C-content-collapse")}>{props.children}</div>
        </div>
    )
}

export default Collapse

export {Panel}