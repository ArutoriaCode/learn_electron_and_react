import React from 'react';
import './App.css';
import 'element-theme-default';
import 'bootstrap/dist/css/bootstrap.min.css';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import IconButton from './components/IconButton'
import defaultFiles from './utils/defaultFiles'

import { faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="no-gutters row position-relative px-0">
        <div className="col-4 bg-light left-panel px-0">
          <FileSearch 
            title="搜索我的云文档" onFileSearch={
            (value) => { console.log(value) }
          }></FileSearch>
          <FileList
            onItemClick={(file) => { console.log(file) }}
            onItemSave={(id, value) => {console.log(id, value)}}
            onDelItem={(file) => { console.log(file) }}
            files={defaultFiles} 
          />
          <div className="button-group position-absolute d-flex flex-row">
            <IconButton icon={faPlus} text="新建" btnClass="col bg-primary text-light"></IconButton>
            <IconButton icon={faFileExport} text="导入" btnClass="col bg-danger text-light"></IconButton>
          </div>
        </div>
        <div className="col-8 bg-white right-panel px-1">
          <h1>This is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
