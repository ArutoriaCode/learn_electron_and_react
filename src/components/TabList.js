/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './TabList.scss'

const TabList = ({ files, activeId, unsavedIds, onTabClick, onCloseTab }) => {
  return (
    <ul className="d-flex flex-row nav nav-pills tab-component">
      {
        files.map(file => {
          const withUnsavedMark = unsavedIds.includes(file.id)
          const tabItem = classNames('nav-link', {
            'active': file.id === activeId,
            'withUnsaved': withUnsavedMark
          })
          return (
            <li onClick={event => {
              event.preventDefault()
              onTabClick(file.id)
            }} className="nav-item" key={file.id}>
              <a
                className={tabItem}
                href="#"
              >
                {file.title}
                <span className="ml-2 close-icon" onClick={event => {
                  event.stopPropagation()
                  onCloseTab(file.id)
                }}>
                  <FontAwesomeIcon
                    icon={faTimes}
                  />
                </span>
                {
                  withUnsavedMark && <span className="rounded-circle ml-2 unsaved-icon"></span>
                }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array.isRequired,
  activeId: PropTypes.string.isRequired,
  unsavedIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  unsavedIds: [],
  onTabClick: () => {},
  onCloseTab: () => {}
}

export default TabList
