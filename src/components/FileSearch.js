import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const FileSeach = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const node = useRef()

  const startSearch = () => {
    setInputActive(true)
  }

  const closeSerach = (e) => {
    e.preventDefault()
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    const handleInputEvent = (event) => {
      const { keyCode } = event
      if (keyCode === 13 && inputActive) {
        onFileSearch(value)
      } else if (keyCode === 27 && inputActive) {
        closeSerach(event)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })

  return (
    <div 
      className="alert alert-light file-search"
      style={{ cursor: "text" }}
    >
      {
        !inputActive && <div className="d-flex flex-row justify-content-between align-items-center"
        onClick={startSearch}>
          <span className="my-input">{title}</span>
          <button
            type="button"
            className="icon-button"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      }
      {
        inputActive && <div className="d-flex flex-row justify-content-between align-items-center">
          <input 
            className="my-input"
            autoFocus={inputActive}
            value={value}
            ref={node}
            onChange={(e) => { setValue(e.target.value) }}></input>
          <button
            className="icon-button"
            onClick={closeSerach}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      }
    </div>
  )
}

FileSeach.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

FileSeach.defaultProps = {
  title: '我的云文档'
}

export default FileSeach
