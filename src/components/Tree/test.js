import React from 'react'
import Tree, {TreeNode} from './Tree'

function Tree(props) {
    return (
        <ul>
            {props.children.map(it => <TreeNode {...it.props} onCheck={xxx}/>)}
        </ul>
    )
}