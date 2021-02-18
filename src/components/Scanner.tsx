import { ReactElement, useRef, useEffect } from 'react'
import jsQR from 'jsqr'

import './Scanner.css'

import ScannerBorders from './ScannerBorders'

import useUserMedia from '../hooks/use-usermedia'

const Scanner = ({
  active,
  onSuccessfulScan,
}: {
  active: boolean
  onSuccessfulScan: (data: string) => void
}): ReactElement => {
  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  const {
    stream,
    error,
    status,
    stopMediaStream,
    startMediaStream,
  } = useUserMedia()

  const startCapturing = async () => {
    if (!canvas || !canvas.current || !video || !video.current) {
      return
    }

    const context = canvas.current.getContext('2d')

    if (!context) {
      return
    }

    const { width, height } = canvas.current

    context.drawImage(video.current, 0, 0, width, height)

    const imageData = context.getImageData(0, 0, width, height)
    const qrCode = jsQR(imageData.data, width, height)

    if (qrCode === null) {
      setTimeout(startCapturing, 500)
    } else {
      onSuccessfulScan(qrCode.data)

      stopMediaStream()
      video.current.srcObject = null
    }
  }

  const handleCanPlay = () => {
    if (!canvas || !canvas.current || !video || !video.current) {
      return
    }

    canvas.current.width = video.current.videoWidth
    canvas.current.height = video.current.videoHeight

    if (error !== null) {
      // TODO: show dialog to user with an error
    } else {
      startCapturing()
    }
  }

  useEffect(() => {
    if (status !== 'resolved' || !video || !video.current) {
      return
    }

    video.current.srcObject = stream
    video.current.play()
  }, [status, stream])

  useEffect(() => {
    if (active && status === 'stopped') {
      startMediaStream()
    }
  }, [active])

  return (
    <div className={`scanner ${active ? '' : 'scanner--hidden'}`}>
      <div className="scanner__aspect-ratio-container">
        <canvas ref={canvas} className="scanner__canvas" />
        <video
          ref={video}
          onCanPlay={handleCanPlay}
          className="scanner__video"
        />
        <ScannerBorders />
      </div>

      <div className="scanner-tip">
        <div>Scan a QR code with your camera to see what it says.</div>
      </div>
    </div>
  )
}

export default Scanner
