import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import IconButton from './components/IconButton'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'
import { flattenArr, objToArr } from './utils/helper'

import { faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [files, setFiles] = useState(flattenArr(defaultFiles, 'id'))
  const [searchFiles, setSearchFiles] = useState([])
  const [filesArr, setFilesArr] = useState(objToArr(files))
  const [openedFiles, setOpenedFiles] = useState([])
  const [unsavedIds, setUnsavedIds] = useState([])
  const [activeId, setActiveId] = useState('')

  const onSerachFile = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const onDeleteFile = (file) => {
    delete files[file.id]
    setFilesArr(objToArr(files))
  }

  const onOpenFile = (file) => {
    const flag = openedFiles.find(openFile => openFile.id === file.id)
    setActiveId(file.id)
    if (flag) return
    setOpenedFiles([
      ...openedFiles,
      file
    ])
  }

  const onCloseTab = (id) => {
    const newFiles = flattenArr(openedFiles, 'id')
    console.log('newFiles ==> ', newFiles)
    delete newFiles[id]
    const openFiles = objToArr(newFiles)
    console.log('openFiles ==> ', openFiles)
    setOpenedFiles(openFiles)
    if (openFiles.length && id === activeId) {
      const activeFile = openFiles[openFiles.length - 1].id
      setActiveId(activeFile)
    }
  }

  const markChange = (value) => {
    setFiles({
      ...files,
      [files[activeId]]: {
        ...files[activeId],
        body: value
      }
    })
    setUnsavedIds([
      ...unsavedIds,
      activeId
    ])
  }
  
  return (
    <div className="container-fluid px-0">
      <div className="no-gutters row position-relative px-0">
        <div className="col-4 bg-light left-panel px-0">
          <FileSearch 
            title="搜索我的云文档" 
            onFileSearch={onSerachFile}
            onCloseSearch={() => {setSearchFiles([])}}
          />
          <FileList
            onItemClick={onOpenFile}
            onItemSave={(id, value) => {console.log(id, value)}}
            onDelItem={onDeleteFile}
            files={searchFiles.length ? searchFiles : filesArr}
          />
          <div className="button-group position-absolute d-flex flex-row">
            <IconButton icon={faPlus} text="新建" btnClass="col bg-primary text-light"></IconButton>
            <IconButton icon={faFileExport} text="导入" btnClass="col bg-danger text-light"></IconButton>
          </div>
        </div>
        <div className="col-8 bg-white right-panel px-0">
          {
            openedFiles.length > 0 && <>
              <TabList 
                files={openedFiles}
                activeId={activeId}
                unsavedIds={unsavedIds}
                onTabClick={(id) => {setActiveId(id)}}
                onCloseTab={onCloseTab}
              />
              <SimpleMDE
                options={{
                  minHeight: '515px'
                }}
                value={files[activeId].body} onChange={markChange}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
