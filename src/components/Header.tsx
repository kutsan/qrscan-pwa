import { ReactElement } from 'react'

import './Header.css'
import logo from '../assets/logo.svg'

const Header = (): ReactElement => (
  <header>
    <img
      src={logo}
      width={64}
      height={64}
      className="header__logo"
      alt="logo"
    />

    <div className="header__text-container">
      <div className="header__title">qrscan-pwa</div>
      <div className="header__description">QR Code Scanner as a PWA</div>
    </div>
  </header>
)

export default Header
