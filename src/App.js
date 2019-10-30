import React, { useState } from 'react';
import './App.css';
// 高亮
import Highlight from 'react-highlight'
import './hlt-github.css'

// 拖拽上传
import DragUpload from './DragUpload'
// 分页
import Pagination from './Pagination'
// 树形控件
import Tree, {TreeNode} from './Tree'
// 虚拟长列表
import InfiniteScroll from './InfiniteScroll'

// 树形控件数据
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
]
function dataToTreeNode(data) {
  return data.map(it => {
    if(it.children) {
      return <TreeNode key={it.key} title={it.title}>{dataToTreeNode(it.children)}</TreeNode>
    }
    return <TreeNode {...it} />
  })
}
function TreeComponent() {
  return (
    <Tree>
      {dataToTreeNode(treeData)}
    </Tree>
  ) 
}

const InfiniteList = [...Object.keys(Array(1000).fill(0))]


function App() {
  const [curr, setCurr] = useState(1)
  function switchPage(curr) {
    setCurr(curr)
  }
  let showing
  switch(curr) {
    case 1: 
      showing = <div>
                  <label className="App-title">拖拽上传</label>
                  <DragUpload size={2000 * 2000} action="http://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>
                  <label>将文件拖拽至圆圈中自动上传，上传动画反映上传进度，上传完成后点击重置</label>
                  <Highlight className="javascript">
                    {'<DragUpload size={2000 * 2000} action="http://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>'}
                  </Highlight>
                  <Highlight className="javascript">
                    {'// size传入区域大小 action传入上传地址'}
                  </Highlight>
                </div>
      break
    case 2:
      showing = <div>
                  <label className="App-title">分页</label>
                  <Pagination total={1000} pageSize={20} defaultCurrent={1} onChange={page => console.log(page)}/>
                  <Highlight className="javascript">
                    {'<Pagination total={1000} pageSize={20} defaultCurrent={1} onChange={page => console.log(page)}/>'}
                  </Highlight>
                  <Pagination total={100} pageSize={20} defaultCurrent={3} onChange={page => console.log(page)} />
                  <Highlight className="javascript">
                    {'<Pagination total={100} pageSize={20} defaultCurrent={3} onChange={page => console.log(page)} />'}
                  </Highlight>
                  <Highlight className="javascript">
                    {'// total传入总条目数 pageSize传入单页条目数 defaultCurrent传入初始页码 onChange传入切换页码处理机 参数为当前点击的页码'}
                  </Highlight>
                </div>
      break
      case 3:
        showing = <div>
                    <label className="App-title">树形控件</label>
                    <TreeComponent />
                  </div>
      break
      case 4:
        showing = <div>
                    <label className="App-title">无限滚动列表</label>
                    <InfiniteScroll data={InfiniteList}/>
                    <Highlight className="javascript">
                      {'<InfiniteScroll data={InfiniteList}/>'}
                    </Highlight>
                    <Highlight className="javascript">
                      {'// const InfiniteList = [...Object.keys(Array(1000).fill(0))]'}
                    </Highlight>
                  </div>
      break
      default:    
    }

    return (
      <div className="App">
        {showing}
        <div className="App-bottom"></div>
        <Pagination total={4} pageSize={1} defaultCurrent={1} onChange={switchPage} />
      </div>
  );
}

export default App;
