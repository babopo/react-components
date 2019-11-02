import React, {useState, useRef, useEffect} from 'react'
import './Slider.css'

/**
 * props:
 * maxValue 表示最大值 defaultValue 为数字
 * onValue 在val改变时返回结果，返回一个数字
 * 
 * 思路：mousemove和mouseup事件需要绑定在document事件上
 * 利用useEffect的限制执行，注意当拖拽状态和其他依赖值改变时也要重新绑定事件，否则事件处理机会使用闭包中变量的值
 */
function Slider(props) {
    const [val, setVal] = useState(props.defaultValue)
    // 记录鼠标的初始位置
    const [originX, setX] = useState()
    // 保存当前是否正在拖动，方便鼠标事件判断
    const [dragging, setDragging] = useState(false)
    const containerEL = useRef(null)
    const dragBlockEL = useRef(null)
    function setCurrentVal(e) {
        if(e.target.matches('.Sd-container div')) {
            setVal(e.nativeEvent.offsetX / 400 * props.maxValue)
        }
    }

    function inputVal(e) {
        let tempVal = e.target.value
        if(tempVal < 0) {
            tempVal = 0
        }
        if(tempVal > props.maxValue) {
            tempVal = props.maxValue
        }
        setVal(tempVal)
    }

    useEffect(() => {
        // 因为会产生闭包，每次dragging状态改变时都重新绑定
        function move(e) {
            if(dragging) {
                dragBlockEL.current.style.left =  dragBlockEL.current.offsetLeft + e.clientX - originX + 'px'
                // 边界限制
                if(dragBlockEL.current.offsetLeft > 400) {
                    dragBlockEL.current.style.left = '400px'
                } else if(dragBlockEL.current.offsetLeft < 0) {
                    dragBlockEL.current.style.left = '0'
                } else {
                    // 鼠标移出边界时不在更新值，保留鼠标移动时相对移动的位置，否则鼠标回移滑块也会跟随回移
                    setX(e.clientX)
                    setVal(dragBlockEL.current.offsetLeft / 400 * props.maxValue)
                }
            }
        }
        function endMove(e) {
            if(dragging) {
                setDragging(false)
            }
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', endMove)
        return () => {
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', endMove)
        }
    }, [dragging, originX, props.maxValue])

    useEffect(() => {
        // 值变动时将值传给组件外
        props.onValue(val | 0)
    }, [props, val])

    function dragBlock(e) {
        setX(e.clientX)
        setDragging(true)
    }

    return (
        <div className="Sd-container" ref={containerEL} onClick={setCurrentVal} >
            <div>
                <div className="Sd-selected" style={{width: (val / props.maxValue * 400)}}/>
                <label tabIndex={0} className="Sd-block" style={{left: (val / props.maxValue * 400)}} ref={dragBlockEL} onMouseDown={dragBlock}></label>
            </div>
            <input className='Sd-showVal' value={val | 0} onChange={inputVal}/>
        </div>
    )
}


export default Slider