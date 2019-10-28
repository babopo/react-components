import React from 'react';
import './App.css';

import DragUpload from './DragUpload'

function App() {
  return (
    <div className="App">
      <DragUpload size={2000 * 2000} action="http://www.mocky.io/v2/5db65efc2f000058007fe7ed"/>  
    </div>
  );
}

export default App;
