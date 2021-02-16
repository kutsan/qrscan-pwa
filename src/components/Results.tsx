import React, { ReactElement } from 'react'

import './Results.css'

const Results = ({
  active,
  decodedData,
  onNewScan,
}: {
  active: boolean
  decodedData: string
  onNewScan: () => void
}): ReactElement | null => {
  if (!active) {
    return null
  }

  const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
  const regex = new RegExp(urlExp)

  let data

  if (decodedData.match(regex)) {
    data = (
      <a href={decodedData} target="_blank" rel="noopener noreferrer">
        {decodedData}
      </a>
    )
  } else {
    data = decodedData
  }

  return (
    <div className="results">
      <h2>Decoded Data</h2>

      <div className="results__data">{data}</div>
      <div className="results__button-container">
        <button type="button" className="results__button" onClick={onNewScan}>
          New Scan
        </button>
      </div>
    </div>
  )
}

export default Results
