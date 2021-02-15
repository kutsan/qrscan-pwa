import React, { ReactElement } from 'react'

import './Footer.css'

const Footer = (): ReactElement => (
  <footer>
    <span className="footer__text">Source-code available at</span>
    <a
      href="http://github.com/kutsan/qrcode-pwa"
      className="footer__project-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      kutsan/qrcode-pwa
    </a>
  </footer>
)

export default Footer
