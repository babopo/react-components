import React, { useState } from 'react'
import './Tree.css'


/**
 * props说明
 * children 为转换好的TreeNode元素
 */
function Tree(props) {
    return (
        <ul className="T-container">
            {props.children}
        </ul>
    )
}


/**
 * props
 * title
 * key
 */
function TreeNode(props) {
    const [expand, setExpand] = useState(true)
    function change() {
        setExpand(!expand)
    }
    return (
        <li className="T-item">
            <input type="checkbox" id={props.title} style={{display: 'none'}}/>
            <label className="T-checkbox" onClick={change} htmlFor={props.title}>
                {props.children ? <i className={"fa fa-lg fa-caret-" + (expand ? "down" : "right")} aria-hidden="true" /> : null}
            </label>
            <span className="T-text">{props.title}</span>
            {expand ? (props.children ? (<Tree>{props.children}</Tree>) : null) : null}
        </li>
    )

}


export default Tree

export {TreeNode}
