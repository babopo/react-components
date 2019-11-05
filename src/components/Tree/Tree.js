import React, { useState } from 'react'
import './Tree.css'


/**
 * props说明
 * onChange 获取当前被勾选的项的key组成的数组
 * defaultSelected defaultChecked 均为数组，包含选项key的字符串
 * data属性传入一个数组对象，包含以下属性
 *          title 结点的名称
 *          key
 *          children包含子节点的数组
 */
function Tree(props) {
    const [status, setStatus] = useState(Array(props.data.length).fill(0))
    function checkKeys(keys) {
        // 每层收到下一层的反馈时都要合并一下
        props.onChange(Array.from(new Set([...keys, ])))
    }

    function change(key) {
        props.onChange(key)
    }
    const body = []
    for(const set of props.data) {
        if(set.children) {
            body.push(<li className="T-item" key={set.key}>
                            <input type="checkbox" id={set.key} style={{display: 'none'}}/>
                            <label className="T-checkbox" onClick={() => change(set.key)} htmlFor={set.key}><i className="fa fa-check" aria-hidden="true" /></label>
                            {set.title}
                            <Tree {...props} data={set.children} onChange={checkKeys}/>
                        </li>)
        } else {
            body.push(<li className="T-item" key={set.key}>
                            <input type="checkbox" id={set.key} style={{display: 'none'}}/>
                            <label className="T-checkbox" onClick={() => change(set.key)} htmlFor={set.key}><i className="fa fa-check" aria-hidden="true" /></label>
                            {set.title}
                        </li>)
        }
    }
    return (
        <ul className="T-container">
            {body}
        </ul>
    )
}


function TreeNode(props) {

}


export default Tree

export {TreeNode}
