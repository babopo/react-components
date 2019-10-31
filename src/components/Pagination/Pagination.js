// 分页组件
import React, { useState, useEffect } from 'react'
import './Pagination.css'

/**
 * props参数
 * total 总条目数
 * pageSize 每页展示条目数
 * defaultCurrent 默认选中页码
 * onChange(page) 事件，页面被点击时触发事件将新的页码传给处理机
 */
/**
 * 思路：根据页数生成一个表，中间只展示五个，被选中的展示在正中间，首页和尾页一定展示
 * 展示不下的以省略号展示，点击省略号一次移动5格，不足5格移动到底
 * 被选中的页码高亮
 */
function Pagination(props) {
    const { defaultCurrent, total, pageSize } = props
    const [currPage, setPage] = useState(defaultCurrent)
    // 总页码数
    const pages = Math.ceil(total / pageSize)
    const list = []
    //创建列表内容
    if(pages <= 7) { 
        for(let i = 1; i <= pages; i++) {
            list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
        }
    } else {
        if(currPage <= 3) {
            for(let i = 1; i <= 5; i++) {
                list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
            }
            list.push(<li onClick={() => setCurrPage('right')} key="right" className="Pag-omitted Pag-page">...</li>, <li onClick={() => setCurrPage(pages)} key={pages} className="Pag-page">{pages}</li>)
        } else if(currPage === 4) {
            for(let i = 1; i <= 6; i++) {
                list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
            }
            list.push(<li onClick={() => setCurrPage('right')} key="right" className="Pag-omitted Pag-page">...</li>, <li onClick={() => setCurrPage(pages)} key={pages} className="Pag-page">{pages}</li>)
        } else if(currPage >= pages - 2) {
            list.push(<li onClick={() => setCurrPage(1)} className="Pag-page" key={1}>1</li>, <li onClick={() => setCurrPage('left')} key="left" className="Pag-omitted Pag-page">...</li>)
            for(let i = pages - 4; i <= pages; i++) {
                list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
            }
        } else if(currPage === pages - 3) {
            list.push(<li onClick={() => setCurrPage(1)} className="Pag-page" key={1}>1</li>, <li onClick={() => setCurrPage('left')} key="left" className="Pag-omitted Pag-page">...</li>)
            for(let i = pages - 5; i <= pages; i++) {
                list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
            }
        } else {
            list.push(<li onClick={() => setCurrPage(1)} className="Pag-page" key={1}>1</li>, <li onClick={() => setCurrPage('left')} key="left" className="Pag-omitted Pag-page">...</li>)
            for(let i = currPage - 2; i <= currPage + 2; i++) {
                list.push(<li onClick={() => setCurrPage(i)} className={currPage === i ? 'Pag-select Pag-page' : 'Pag-page'} key={i}>{i}</li>)
            }
            list.push(<li onClick={() => setCurrPage('right')} key="right" className="Pag-omitted Pag-page">...</li>, <li onClick={() => setCurrPage(pages)} key={pages} className="Pag-page">{pages}</li>)
        }
    }

    useEffect(() => {
        props.onChange(currPage)
    })
    
    function setCurrPage(change) {
        if(change === 'left') {
            const move = currPage - 5
            setPage(move < 1 ? 1 : move)
        } else if (change === 'right') {
            const move = currPage + 5
            setPage(move > pages ? pages : move)
        } else {
            setPage(change)
        }
    }

    return (
        <ul className="Pag-container">
            {list}
        </ul>
    )
}

export default Pagination