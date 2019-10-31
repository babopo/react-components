import React, { useRef, useState } from 'react'

import './InfiniteScroll.css'

/**
 * props传入一个以值等于下标的data数组
 * 
 * 要点就是列表中每个元素都要绝对定位，这样渲染后面的而前面不渲染时页面也能被margin撑开
 * 利用盒子元素的scrollTop属性来调整应当渲染的元素
 */
function InfiniteScroll(props) {
    const boxRef = useRef(null)
    const [start , setStart] = useState(0)
    const [end , setEnd] = useState(200)
    // 保留最后一个，防止滚轮向上滚时滚动条变长
    const [bottom , setBottom] = useState(200)

    function wheelScroll() {
        setStart(boxRef.current.scrollTop)
        setEnd(boxRef.current.scrollTop + boxRef.current.clientHeight)
        setBottom(boxRef.current.scrollHeight)
    }
    return (
        <ul className="IS-container" ref={boxRef} onScroll={wheelScroll}>
            {props.data.map(it => {
                // 当前元素与内部page顶端的距离
                const top = it * 25
                if((top > start - 30 && top < end + 30) || ((bottom - top) <= 25 && (bottom - top) >= 0)) {
                    // 列表中返回显示出来的元素
                    return <li className="IS-item" style={{marginTop: top}} key={it}>{it}</li>
                } 
                return null   
            })}
        </ul>
    )
}

export default InfiniteScroll