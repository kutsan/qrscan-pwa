import { ReactElement } from 'react'

import './Results.css'
import scanIcon from '../assets/scan.svg'

const Results = ({
  active,
  decodedData,
  onNewScan
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

  if (decodedData === '') {
    data = <span className="results__empty">There is no data to show.</span>
  } else if (decodedData.match(regex) !== null) {
    data = (
      <a
        className="results__link"
        href={decodedData}
        target="_blank"
        rel="noopener noreferrer"
      >
        {decodedData}
      </a>
    )
  } else {
    data = decodedData
  }

  return (
    <div className="results">
      <div className="results__data">{data}</div>
      <div className="results__button-container">
        <button type="button" className="results__button" onClick={onNewScan}>
          <img className="results__scan-icon" src={scanIcon} alt="New Scan" />
          <span>New Scan</span>
        </button>
      </div>
    </div>
  )
}

export default Results
