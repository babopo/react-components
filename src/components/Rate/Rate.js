import React, { useState } from "react"
import './Rate.css'
// 引入字体图标
import '../../assets/font-icon/css/font-awesome.min.css'


/**
 * props
 * count 总星星数 defaultValue 默认分数 onValue 分数回调
 */
function Rate(props) {
    const [val, setVal] = useState(props.defaultValue)
    const [tempVal, setTempVal] = useState(props.defaultValue)
    function hoverRate(e) {
        const currVal = (e.nativeEvent.offsetX / 32).toFixed(1)
        setVal(currVal)
    }
    function setRate(e) {
        const currVal = (e.nativeEvent.offsetX / 32).toFixed(1)
        setVal(currVal)
        setTempVal(val)
        props.onValue(currVal)
    }
    function store() {
        // 鼠标进入时记录上一次确定的值，因为星星需要跟随鼠标的填充效果要改变val
        setTempVal(val)
    }
    function retrive() {
        setVal(tempVal)
    }
    return (
        <div className="R-container" style={{width: props.count * 32}} onMouseEnter={store} onMouseLeave={retrive} onMouseMove={hoverRate} onClick={setRate}>
            <div className="R-box" style={{width: props.count * 32}}>
                {
                    Array(props.count).fill(0).map((_, idx) => <div className="R-item" key={idx}><i className="fa fa-star-o" aria-hidden="true"/></div>)
                }
            </div>
            <div className="R-box-up" style={{width: val * 32}}>
                <div className="R-box R-box-fill" style={{width: props.count * 32}} onMouseMove={hoverRate} onClick={setRate}>
                    {
                        Array(props.count).fill(0).map((_, idx) => <div className="R-item" key={idx}><i className="fa fa-star" aria-hidden="true"/></div>)
                    }
                </div>
            </div>
            <input className="R-showVal" readOnly value={val}/>
        </div>
    )
}



export default Rate