import React, {useState, useEffect} from 'react'
import './CheckBox.css'

/**
 * props
 * group 接收一个数组，包含所有的选项
 * defaultChecked 接收一个数组， 包含默认的被选择的选项
 * onChange 选项改变时向组件外发送被选择的项组成的数组
 */
function CheckBox(props) {
    const [checked, setChecked] = useState(props.defaultChecked)
    useEffect(() => {
        props.onChange(checked)
    }, [props, checked])

    function checkAll() {
        if(checked.length === props.group.length) {
            setChecked([])
        } else {
            setChecked(props.group)
        }
    }
    function singleCheck(val) {
        
        if(checked.indexOf(val) === -1) {
            setChecked([...checked, val])
        } else {
            setChecked(checked.filter(it => it !== val))
        }
    }
    let checkAllIcon = null
    if(checked.length === props.group.length) {
        checkAllIcon = <i className="fa fa-check" aria-hidden="true" />
    } else if(checked.length > 0) {
        checkAllIcon = <i className="fa fa-stop" aria-hidden="true" />
    }
    return (
        <div>
            <div className="CB-checkall">
                <input className="CB-input" type="checkbox" onChange={checkAll} checked={checked.length === props.group.length ? true : false} id="checkall"/>
                <label className="CB-box" htmlFor="checkall">
                    {checkAllIcon}
                </label>
                <span>全选</span>
                <hr class="CB-boundry"/>
            </div>
            {props.group.map(val => {
                if(checked.find(it => it === val)) {
                    return (
                        <div key={val} className="CB-container">
                            {/* 注意不论是否check都要传checked属性 受控组件！！ */}
                            <input className="CB-input" type="checkbox" id={val} checked={true} onChange={() => singleCheck(val)}/>
                            <label className="CB-box" htmlFor={val}><i className="fa fa-check" aria-hidden="true" /></label>
                            <span>{val}</span>
                        </div>)
                } else {
                    return ( 
                        <div key={val} className="CB-container">
                            <input className="CB-input" type="checkbox" checked={false} id={val} onChange={() => singleCheck(val)}/>
                            <label className="CB-box" htmlFor={val}></label>
                            <span>{val}</span>
                        </div>)
                }
            })}
        </div>
    )
}

export default CheckBox