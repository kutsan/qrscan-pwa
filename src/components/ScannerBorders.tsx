import { ReactElement } from 'react'

import './ScannerBorders.css'

export const ScannerBorders = (): ReactElement => (
  <>
    <div className="scanner-border scanner-border--top-left" />
    <div className="scanner-border scanner-border--top-right" />
    <div className="scanner-border scanner-border--bottom-left" />
    <div className="scanner-border scanner-border--bottom-right" />
  </>
)
