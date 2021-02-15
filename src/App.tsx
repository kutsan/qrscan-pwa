import React, { ReactElement, useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'

import './App.css'

const isMediaStream = (
  candidate: MediaStream | MediaSource | Blob | null
): candidate is MediaStream => candidate !== null && 'getTracks' in candidate

const App = (): ReactElement => {
  const [code, setCode] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [scanDone, setScanDone] = useState(false)

  const video = useRef<HTMLVideoElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  const startCapturing = async () => {
    // eslint-disable-next-line no-console
    console.log('canvas.current is', canvas.current)

    if (!canvas || !canvas.current || !video || !video.current) {
      throw new Error('canvas is ')
    }

    const context = canvas.current.getContext('2d')

    if (!context) {
      return
    }

    const { width, height } = canvas.current

    context.drawImage(video.current, 0, 0, width, height)

    const imageData = context.getImageData(0, 0, width, height)
    const qrCode = jsQR(imageData.data, width, height)

    if (qrCode !== null) {
      setCode(qrCode.data)

      const stream = video.current.srcObject

      if (isMediaStream(stream)) {
        const tracks = stream.getTracks()
        tracks[0].stop()
        video.current.srcObject = null
        setScanDone(true)
        setStreaming(false)
      }
    } else {
      setTimeout(startCapturing, 100)
    }
  }

  const handleCanPlay = () => {
    if (!canvas || !canvas.current || !video || !video.current) {
      return
    }

    if (!streaming) {
      canvas.current.width = video.current.videoWidth
      canvas.current.height = video.current.videoHeight

      startCapturing()
      setStreaming(true)
    }
  }

  const setupMediaStream = async (): Promise<void> => {
    if (
      !canvas ||
      !canvas.current ||
      !video ||
      !video.current ||
      !navigator.mediaDevices.getUserMedia
    ) {
      return
    }

    let stream: MediaStream

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      })

      video.current.srcObject = stream
      video.current.play()
    } catch (err) {
      setCode(`${err.name}: ${err.message}`)
    }
  }

  const handleNewScan = () => {
    setCode('')
    setScanDone(false)
    setupMediaStream()
  }

  useEffect(() => {
    setupMediaStream()
  }, [])

  return (
    <>
      <main>
        <video
          ref={video}
          onCanPlay={handleCanPlay}
          className={`scanner ${scanDone ? 'scanner--hidden' : ''}`}
        />
        <div>{code}</div>
        <canvas ref={canvas} className="snapshot" />

        {scanDone && (
          <button type="button" onClick={handleNewScan}>
            New Scan
          </button>
        )}
      </main>
    </>
  )
}

export default App
