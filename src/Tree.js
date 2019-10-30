import React from 'react'
import './Tree.css'


/**
 * props 说明
 * 
 */
function Tree(props) {
    return (
        <ul className="T-container">
            {props.children}
        </ul>
    )
}

/**
 * props说明
 * title 结点的名称
 * key
 * children包含子节点的数组
 */

function TreeNode(props) {
    if(props.children) {
        return (
            <li>
                <input type="checkbox"/>
                <span>{props.title}</span>
                <ul className="T-container">
                    {props.children}
                </ul>
            </li>
        )
    } else {
        return (
            <li>
                <input type="checkbox"/>
                <span>{props.title}</span>
            </li>
        )
    }
}

export default Tree

export {TreeNode}