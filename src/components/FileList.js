import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faCheck, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import PropTypes from 'prop-types'

const FileList = ({ files, onItemClick, onItemSave, onDelItem }) => {

  const style = {
    marginLeft: '4px'
  }


  const [editStatus, setEditStatus] = useState(null)
  const [value, setValue] = useState('')

  const saveFileName = (title) => {
    const editItem = files.find(file => file.id === editStatus)
    setEditStatus(null)
    onItemSave(editItem, title)
  }

  const onCloseInput = (e) => {
    e.preventDefault()
    setEditStatus(null)
  }

  useEffect(() => {
    const handleEvent = (event) => {
      const { keyCode } = event
      if (keyCode === 13 && editStatus) {
        saveFileName(value)
      } else if (keyCode === 27 && editStatus) {
        setEditStatus(null)
      }
    }
    document.addEventListener('keyup', handleEvent)
    return () => {
      document.removeEventListener('keyup', handleEvent)
    }
  })

  return (
    <ul className="list-group list-group-flush">
      {
        files.map(file => {
          return <li className="fileList-item bg-light list-group-item d-flex flex-row justify-content-between"
            key={file.id}>
            <div onClick={() => {onItemClick(file)}}
              className="d-flex flex-row justify-content-start align-items-center col-10">
              {
                file.id !== editStatus &&
                <>
                  <FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon>
                  <span style={style}>
                    {file.title.length > 15 ? file.title.substring(0, 15) + ' ...' : file.title}
                  </span>
                </>
              }
              {
                file.id === editStatus && <>
                  <FontAwesomeIcon
                    title={value.length ? "" : "无法保存"}
                    icon={faCircle}
                    className={value.length ? "text-success" : "text-danger"}
                  />
                  <input style={style} className="my-input"
                    autoFocus={true}
                    value={value} onChange={
                      (e) => { setValue(e.target.value) }
                    }></input>
                </>
              }
            </div>
            <div className="btn-group btn-group-sm d-flex flex-row justify-content-end col-2">
              {
                file.id !== editStatus &&
                <>
                  <button onClick={() => {
                    setEditStatus(file.id)
                    setValue(file.title)
                  }} className="icon-button">
                    <FontAwesomeIcon
                      title="编辑"
                      icon={faEdit}
                    ></FontAwesomeIcon>
                  </button>
                  <button onClick={() => { onDelItem(file) }} className="icon-button">
                    <FontAwesomeIcon
                      title="删除"
                      icon={faTrashAlt}
                    ></FontAwesomeIcon>
                  </button>
                </>
              }
              {
                file.id === editStatus && <>
                  <button onClick={() => {
                    if (!value.length) return
                    saveFileName(value)
                  }} className="icon-button">
                    <FontAwesomeIcon title="保存" icon={faCheck}></FontAwesomeIcon>
                  </button>
                  <button onClick={onCloseInput} className="icon-button">
                    <FontAwesomeIcon title="取消" icon={faTimes}></FontAwesomeIcon>
                  </button>
                </>
              }
            </div>
          </li>
        })
      }
    </ul>
  )
}

FileList.propsTypes = {
  files: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  onItemSave: PropTypes.func
}

FileList.defaultProps = {
  onItemClick: () => { },
  onItemSave: () => { }
}

export default FileList
