import React from 'react';
import './App.css';

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
  return (
    <div className="App">
      <label>拖拽上传</label>
      <DragUpload size={2000 * 2000} action="http://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>  
      <label>分页</label>
      <Pagination total={1000} pageSize={20} defaultCurrent={1} onChange={page => console.log(page)}/>
      <Pagination total={100} pageSize={20} defaultCurrent={3} onChange={page => console.log(page)} />
      <label>树形控件</label>
      <TreeComponent />
      <label>虚拟长列表</label>
      <InfiniteScroll data={InfiniteList}/>
    </div>
  );
}

export default App;
