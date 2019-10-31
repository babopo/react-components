import React, { useState, useMemo } from 'react'
import './Switch.css'


/**
 * props说明
 * defaultChecked 初始状态
 * onChange 向外传递当前值
 */
function Switch(props) {
    const [checked, setChecked] = useState(props.defaultChecked)
    useMemo(() => {
        props.onChange(checked)
    }, [checked, props])
    function toggle() {
        setChecked(!checked)
    }
    return (
        <div onClick={toggle} className={(checked ? 'S-checked' : 'S-uncheck') + ' S-box'}>
            <div className="S-dot"/>
        </div>
    )
}

export default Switch