import React, { useState } from 'react';
import './App.css';
// 高亮
// import Highlight from 'react-highlight'
// import './hlt-github.css'
import { Prism as Highlight } from 'react-syntax-highlighter'
import prism from  './highlight/prism'
// 引入字体图标
import './assets/font-icon/css/font-awesome.min.css'

// 拖拽上传
import DragUpload from './components/DragUpload/DragUpload'
// 分页
import Pagination from './components/Pagination/Pagination'
// 树形控件
import Tree, {TreeNode} from './components/Tree/Tree'
// 虚拟长列表
import InfiniteScroll from './components/InfiniteScroll/InfiniteScroll'
// 开关
import Switch from './components/Switch/Switch'
// 滑动输入
import Slider from './components/Slider/Slider'
// 评分
import Rate from './components/Rate/Rate'
// 数字输入框
import InputNumber from './components/InputNumber/InputNumber'
// 折叠面板
import Collapse, {Panel} from './components/Collapse/Collapse'
// 多选框
import CheckBox from './components/CheckBox/CheckBox'
// 时间选择框
import TimePicker from './components/TimePicker/TimePicker'
// 走马灯
import Carousel from './components/Carousel/Carousel'

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
  return data.map((it => {
    if(it.children) {
      return (
        <TreeNode title={it.title} key={it.key} >
          {dataToTreeNode(it.children)}
        </TreeNode>)
    }
    return <TreeNode title={it.title} key={it.key} />
  }))
}



const InfiniteList = [...Object.keys(Array(30).fill(0))]


function App() {
  const [curr, setCurr] = useState(1)
  function switchPage(curr) {
    setCurr(curr)
  }
  let showing
  switch(curr) {
    case 1: 
      showing = <div>
                  <h1 className="App-title">拖拽上传</h1>
                  <DragUpload size={2000 * 2000} action="https://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>
                  <Highlight language="jsx" style={prism}>
                    {'<DragUpload size={2000 * 2000} action="https://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 将文件拖拽至圆圈中自动上传，上传动画反映上传进度，上传完成后点击圆圈重置'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// size限制传入文件的大小 action为上传地址 示例中为可用的测试地址'}
                  </Highlight>
                </div>
      break
    case 2:
      showing = <div>
                  <h1 className="App-title">分页</h1>
                  <Pagination total={1000} pageSize={20} defaultCurrent={1} onChange={page => console.log(page)}/>
                  <Highlight language="jsx" style={prism}>
                    {'<Pagination total={1000} pageSize={20} defaultCurrent={1} onChange={page => console.log(page)}/>'}
                  </Highlight>
                  <Pagination total={100} pageSize={20} defaultCurrent={3} onChange={page => console.log(page)} />
                  <Highlight language="jsx" style={prism}>
                    {'<Pagination total={100} pageSize={20} defaultCurrent={3} onChange={page => console.log(page)} />'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// total传入总条目数 pageSize传入单页条目数 defaultCurrent传入初始页码 onChange传入切换页码处理机 参数为当前点击的页码'}
                  </Highlight>
                </div>
      break
    case 3:
      showing = <div>
                  <h1 className="App-title">树形控件</h1>
                  <Tree onChange={val => console.log(val)}>
                    {dataToTreeNode(treeData)}
                  </Tree>
                  <Highlight language="jsx" style={prism}>
                    {"<Tree>{dataToTreeNode(treeData)}</Tree>"}
                  </Highlight>
                  <Highlight className="App-snippts" language="javascript" customStyle={{textAlign: "start", display: 'inline-block', paddingLeft: 2000, marginLeft: -2000, marginRight: -2000, paddingRight: 2000}} style={prism} showLineNumbers>
                    {"//传入数据\r\nconst treeData = [\r\n  {\r\n    title: '0-0',\r\n    key: '0-0',\r\n    children: [\r\n      {\r\n        title: '0-0-0',\r\n        key: '0-0-0',\r\n        children: [\r\n          { title: '0-0-0-0', key: '0-0-0-0' },\r\n          { title: '0-0-0-1', key: '0-0-0-1' },\r\n          { title: '0-0-0-2', key: '0-0-0-2' },\r\n        ],\r\n      },\r\n      {\r\n        title: '0-0-1',\r\n        key: '0-0-1',\r\n        children: [\r\n          { title: '0-0-1-0', key: '0-0-1-0' },\r\n          { title: '0-0-1-1', key: '0-0-1-1' },\r\n          { title: '0-0-1-2', key: '0-0-1-2' },\r\n        ],\r\n      },\r\n      {\r\n        title: '0-0-2',\r\n        key: '0-0-2',\r\n      },\r\n    ],\r\n  },\r\n  {\r\n    title: '0-1',\r\n    key: '0-1',\r\n    children: [\r\n      { title: '0-1-0-0', key: '0-1-0-0' },\r\n      { title: '0-1-0-1', key: '0-1-0-1' },\r\n      { title: '0-1-0-2', key: '0-1-0-2' },\r\n    ],\r\n  },\r\n  {\r\n    title: '0-2',\r\n    key: '0-2',\r\n  },\r\n]\r\n\r\nfunction dataToTreeNode(data) {\r\n  return data.map((it => {\r\n    if(it.children) {\r\n      return (\r\n        <TreeNode title={it.title} key={it.key} >\r\n          {dataToTreeNode(it.children)}\r\n        </TreeNode>)\r\n    }\r\n    return <TreeNode title={it.title} key={it.key} />\r\n  }))\r\n}"}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 递归处理，点击父元素向当于所有子孙元素单独被点击 待优化'}
                  </Highlight>
                </div>
      break
    case 4:
      showing = <div>
                  <h1 className="App-title">无限滚动虚拟化列表</h1>
                  <InfiniteScroll data={InfiniteList}/>
                  <Highlight language="jsx" style={prism}>
                    {'<InfiniteScroll data={InfiniteList}/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// const InfiniteList = [...Object.keys(Array(30).fill(0))]'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 初始data长度为30，当滚动到底部时自动加载新的数据，可无限滚动'}
                  </Highlight>
                </div>
      break
    case 5:
      showing = <div>
                  <h1 className="App-title">开关</h1>
                  <Switch defaultChecked onChange={status => console.log(status)}/>
                  <Highlight language="jsx" style={prism}>
                    {'<Switch defaultChecked onChange={status => console.log(status)}/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// defaultChecked传入初始时的状态 onChange绑定处理机传入参数为当前开关状态'}
                  </Highlight>
                </div>
      break
    case 6:
      showing = <div>
                  <h1 className="App-title">滑动输入条</h1>
                  <Slider maxValue={100} defaultValue={35} onValue={val => console.log(val)}/>
                  <div className="App-placholder"></div>
                  <Highlight language="jsx" style={prism}>
                    {'<Slider maxValue={100} defaultValue={35} onValue={val => console.log(val)}/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// maxValue传入最大值 defaultValue传入初始值 onValue绑定处理机获取滑块移动时的新值'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 滑动滑块，点击输入条任意位置，输入框输入都能改变输入条的值，且处理了边界情况'}
                  </Highlight>
                </div>
      break
    case 7:
      showing = <div>
                  <h1 className="App-title">评分</h1>
                  <Rate count={5} defaultValue={2.6} onValue={val => console.log(val)}/>
                  <div className="App-placholder"></div>
                  <Highlight language="jsx" style={prism}>
                    {'<Rate count={5} defaultValue={2.6} onValue={val => console.log(val)}/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// count传入最大评分数(整数)，1分对应1颗星 defaultValue传入初始值 onValue绑定处理机获取新值 精确到小数点后1位'}
                  </Highlight>
                </div>
      break
    case 8:
      showing = <div>
                  <h1 className="App-title">数字输入框</h1>
                  <InputNumber min={1} max={15} defaultValue={6} onChange={num => console.log(num)} />
                  <Highlight language="jsx" style={prism}>
                    {'<InputNumber min={1} max={15} defaultValue={6} onChange={num => console.log(num)} />'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// min最小值 max最大值 defaultValue默认值 onChage获取最新输入'}
                  </Highlight>
                </div>
      break
    case 9:
      showing = <div>
                  <h1 className="App-title">手风琴折叠面板</h1>
                  <Collapse defaultPanel="2" onChange={key => console.log(key)}>
                    <Panel header="title 1" key="1">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro tempore accusamus iure quo, beatae consectetur recusandae rem aliquam eaque dignissimos obcaecati fuga! Illo, nihil vitae nisi qui. Quis est, corporis.</p>
                    </Panel>
                    <Panel header="title 2" key="2">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique vel repellendus, quo, molestias necessitatibus, rerum eligendi quasi possimus voluptas, facere ut perferendis. Veniam blanditiis pariatur dicta sequi! Vel, eveniet laudantium.</p>
                    </Panel>
                    <Panel header="title 3" key="3">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure perferendis praesentium mollitia, dicta doloribus incidunt, recusandae. Impedit excepturi ullam, iure obcaecati facere cum officia similique, quo eaque delectus vero ex.</p>
                    </Panel>
                  </Collapse>
                  <Highlight className="App-snippts" language="jsx" customStyle={{textAlign: "start", display: 'inline-block', paddingLeft: 2000, marginLeft: -2000, marginRight: -2000, paddingRight: 2000}} style={prism} showLineNumbers>
                    {'<Collapse defaultPanel="2" onChange={key => console.log(key)}>\r\n  <Panel header="title 1" key="1">\r\n    <p>{text1}</p>\r\n  </Panel>\r\n  <Panel header="title 2" key="2">\r\n    <p>{text2}</p>\r\n  </Panel>\r\n  <Panel header="title 3" key="3">\r\n    <p>{text3}</p>\r\n  </Panel>\r\n</Collapse>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// defaultPanel默认打开的面板 onChange获取当前被点击的面板的key header面板标题 key面板索引'}
                  </Highlight>
                </div>
      break
    case 10:
      showing = <div>
                  <h1 className="App-title">多选框</h1>
                  <CheckBox group={['Apple', 'Peach', 'Orange', 'Milk']} defaultChecked={['Apple', 'Orange']} onChange={checked => console.log(checked)}/>
                  <Highlight language="jsx" style={prism}>
                    {"<CheckBox group={['Apple', 'Peach', 'Orange', 'Milk']} defaultChecked={['Apple', 'Orange']} onChange={checked => console.log(checked)}/>"}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// group所有选项名称的数组 defaultChecked默认选中的项 onChange获取最新的被选中项组成的数组'}
                  </Highlight>
                </div>
      break
    case 11:
      showing = <div>
                  <h1 className="App-title">时间选择框</h1>
                  <TimePicker defaultTime="11:12:36" onChange={time => console.log(time)}/>
                  <Highlight language="jsx" style={prism}>
                    {'<TimePicker defaultTime="11:12:36" onChange={time => console.log(time)}/>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 为方便展示,传入和获取的时间都是"HH:mm:ss"格式的字符串而不是时间对象 defaultTime默认显示的时间 onChange获取最新的被选择时间'}
                  </Highlight>
                </div>
      break
    case 12:
      showing = <div>
                  <h1 className="App-title">走马灯</h1>
                  <Carousel autoplay onChange={currPage => console.log(currPage)}>
                    <div>
                      <h3>1</h3>
                    </div>
                    <div>
                      <h3>2</h3>
                    </div>
                    <div>
                      <h3>3</h3>
                    </div>
                    <div>
                      <h3>4</h3>
                    </div>
                  </Carousel>
                  <Highlight className="App-snippts" language="jsx" customStyle={{textAlign: "start", display: 'inline-block', paddingLeft: 2000, marginLeft: -2000, marginRight: -2000, paddingRight: 2000}} style={prism} showLineNumbers>
                    {'<Carousel autoplay onChange={currPage => console.log(currPage)}>\r\n  <div>\r\n    <h3>1</h3>\r\n  </div>\r\n  <div>\r\n    <h3>2</h3>\r\n  </div>\r\n  <div>\r\n    <h3>3</h3>\r\n  </div>\r\n  <div>\r\n    <h3>4</h3>\r\n  </div>\r\n</Collapse>'}
                  </Highlight>
                  <Highlight language="javascript" style={prism}>
                    {'// 设置autoplay属性开启自动轮播，点击任意页面按钮自动关闭自动轮播 onChange获取当前页面的下标'}
                  </Highlight>
                </div>
      break
    default:    
  }

  return (
    <div className="App">
      {showing}
      <div className="App-bottom"></div>
      <Pagination total={12} pageSize={1} defaultCurrent={3} onChange={switchPage} />
      <a href="https://github.com/babopo/react-components" target="_blank" className="App-github"><i className="fa fa-github" aria-hidden="true" /> </a>
    </div>
  );
}

export default App;
