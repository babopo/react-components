import React from 'react';
import './App.css';

import DragUpload from './DragUpload'
import Pagination from './Pagination'

function App() {
  return (
    <div className="App">
      <label>拖拽上传</label>
      <DragUpload size={2000 * 2000} action="http://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>  
      <label>分页</label>
      <Pagination total={1000} pageSize={20} defaultCurrent={1}/>
      <Pagination total={100} pageSize={20} defaultCurrent={3}/>
    </div>
  );
}

export default App;
