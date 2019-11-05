import React, { useState, useEffect } from 'react'
import './Carousel.css'


/**
 * props
 * onChange 获取当前展示的页面的idx
 * autoplay 是否自动轮播
 * props.children 接收数个并列的子元素
 * 其实就是个轮播图
 */
function Carousel(props) {
    const [curr, setCurr] = useState(0)
    const [auto, setAuto] = useState(props.autoplay)
    function change(idx) {
        setCurr(idx)
        setAuto(false)
        props.onChange(idx)
    }
    const btns = props.children.map((_, idx) => {
        if(idx === curr) {
            return <span className="Csel-btns-btn Csel-btns-selected" key={idx} onClick={() => change(idx)}/>
        }
        return <span className="Csel-btns-btn" key={idx} onClick={() => change(idx)} />

    })
    useEffect(() => {
        if(auto) {
            setTimeout(() => {
                if(curr < props.children.length - 1) {
                    setCurr(curr + 1)
                    props.onChange(curr + 1)
                } else {
                    setCurr(0)
                    props.onChange(0)
                }
            }, 1500)
        }
    }) 
    return(
        <div className="Csel-container">
            <div className = "Csel-body">
                {props.children.map((it, idx) => <div style={{marginLeft: 300 * (idx - curr)}} className="Csel-item">{it}</div>)}
            </div>
            <div className = "Csel-btns">{btns}</div>
        </div>
    )
}

export default Carousel