import React, { useState, useEffect } from 'react'
import './Tree.css'





/**
 * props说明
 * defaultCheckedKeys 默认被check的元素
 * children 为转换好的TreeNode元素
 * onChange 获取当前被checke的元素
 */
function Tree(props) {
    // 存储当前被选中的项组成的数组，往下传递
    const [checkedValue, setChecked] = useState(props.defaultCheckedKeys)
    function toggle(key) {
        // 根据反馈上来的key做对应的处理
        if(checkedValue.includes(key)) {
            // 当一个已存在的项被uncheck时，其祖先元素和子孙元素也应该被uncheck
            setChecked(checkedValue.filter(it => !((new RegExp('^' + key).test(it)) || (new RegExp('^' + it).test(key)))))
        } else {
            setChecked([...checkedValue, key])
        }
    }
    useEffect(() => {
        // 数组更新时向外界抛出被新的数组
        if(props.onChange){
            props.onChange(checkedValue)
        }
    }, [props, checkedValue])
    return (
        <ul className="T-container">
            {props.children.map(it => <TreeNode {...it.props} checkedValue={checkedValue} key={it.key} onChange={toggle} />)}
        </ul>
    )
}


/**
 * props
 * title
 * key
 * checkedValue 被选中的项
 * onChange向顶层返回当前结点被点击
 */
function TreeNode(props) {
    // 树节点应当在每次刷新时都比对被选中的项
    //包含自己则全选，否则包含的项有自己的子孙元素则半选
    //若子元素都是选中状态则向上层提交自己被选中
    const [expand, setExpand] = useState(true)
    // 当前结点是否被check，有三种状态: uncheck ,halfcheck, checked
    const [checkStatus, setStatus] = useState('uncheck')
    function change() {
        setExpand(!expand)
    }
    useEffect(() => {
        if(!props.checkedValue.includes(props.title) && props.checkedValue.some(it => new RegExp('^' + it).test(props.title))) {
            // 如果父元素checked，自己也应当checked
            props.onChange(props.title)
        }
        if(props.checkedValue.includes(props.title)) {
           setStatus('checked')
        } else if(props.checkedValue.some(it => new RegExp('^' + props.title).test(it))) {
            //说明包含其子元素
            if(props.children.every(it => props.checkedValue.includes(it.props.title))) {
                //说明应该全选
                props.onChange(props.title)
            } else {
                setStatus('halfcheck')
            }
        } else {
            setStatus('uncheck')
        }
    }, [setStatus, props])
    let checkboxLabel
    if(checkStatus === 'uncheck') {
        checkboxLabel = <label className="T-icon" htmlFor={props.title}>
                            <i className={"fa fa-lg fa-circle-o"} aria-hidden="true" />
                        </label>
    }
    if(checkStatus === 'checked') {
        checkboxLabel = <label className="T-icon" htmlFor={props.title}>
                            <i className={"fa fa-lg fa-check-circle-o"} aria-hidden="true" />
                        </label>
    }
    if(checkStatus === 'halfcheck') {
        checkboxLabel = <label className="T-icon" htmlFor={props.title}>
                            <i className={"fa fa-lg fa-stop-circle-o"} aria-hidden="true" />
                        </label>
    }
    return (
        <li className="T-item">
            <input type="checkbox" id={props.title} style={{display: 'none'}}/>
            <label className="T-expandbox" onClick={change}>
                {props.children ? <i className={"fa fa-lg fa-caret-" + (expand ? "down" : "right")} aria-hidden="true" /> : null}
            </label>
            {checkboxLabel}
            <span className="T-text" onClick={() => {props.onChange(props.title)}}>{props.title}</span>
            {expand ? (props.children ? (<ul className="T-container">{props.children.map(it => <TreeNode {...it.props} checkedValue={props.checkedValue} key={it.key} onChange={props.onChange} />)}</ul>) : null) : null}
        </li>
    )

}


export default Tree

export {TreeNode}
