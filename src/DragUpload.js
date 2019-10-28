// 拖拽上传组件
import React, { useState } from 'react'
import './DragUpload.css'
import axios from 'axios'

/**
 * props参数说明
 * action 上传地址
 * size 文件大小限制
 */

function DragUpload(props) {
    const [ percent, setPer ] = useState(170)

    function dragOver(e) {
        // console.log(e)
        // 注意这里和下一步drop都要阻止默认事件，否则将文件拖拽过来会直接打开文件
        e.preventDefault()
    }

    function dropFile(e) {
        e.preventDefault()
        // console.log(e.dataTransfer.files)
        const file = e.dataTransfer.files[0]
        if(file.size > props.size) {
            // 文件太大不能传输
            return false
        }
        // drop文件后立即提交
        const data = new FormData()
        data.append('file', file)
        axios.post(props.action, data, {
            onUploadProgress: e => {
                const currProgress = e.loaded / e.total
                setPer(170 - 200 * currProgress)
                if(currProgress === 100) {

                }
            }
        })
    }
    
    function reset() {
        setPer(170)
    }


    return (
        <div className="DU-container">
            <label 
                htmlFor="upload" 
                className="DU-area" 
                onDragOver={dragOver}
                onDrop={dropFile}
            ></label>
            <div className="DU-block-container" style={{top: percent}}>
                <div className="DU-block1"></div>
                <div className="DU-block2"></div>
                <div className="DU-block3" onClick={reset}></div>
            </div>
        </div>
    )
}


export default DragUpload 