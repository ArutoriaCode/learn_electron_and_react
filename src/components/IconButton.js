import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons'

const IconButton = ({ text, icon, btnClass }) => {

  return (
    <button className={`btn no-border ${btnClass}`}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <span>{text}</span>
    </button>
  )
}

export default IconButton
