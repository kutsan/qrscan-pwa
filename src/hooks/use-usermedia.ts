import { useEffect, useState } from 'react'

const isMediaStream = (
  candidate: MediaStream | MediaSource | Blob | null
): candidate is MediaStream => candidate !== null && 'getTracks' in candidate

type UseUserMediaStatusType =
  | 'idle'
  | 'pending'
  | 'resolved'
  | 'rejected'
  | 'stopped'
interface UseUserMediaType {
  stream: MediaStream | null
  error: Error | null
  status: UseUserMediaStatusType
  stopMediaStream: () => void
  startMediaStream: () => void
}

export const useUserMedia = (): UseUserMediaType => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<UseUserMediaStatusType>('idle')

  const startMediaStream = (): void => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment'
        }
      })
      .then((userStream) => {
        setStream(userStream)
        setStatus('resolved')
      })
      .catch((err) => {
        setError(err)
        setStatus('rejected')
      })
  }

  useEffect(() => {
    ;(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameraIsPermitted = devices.some(
        (device) => device.label !== '' && device.kind === 'videoinput'
      )

      if (cameraIsPermitted) {
        startMediaStream()
      } else {
        setStatus('pending')
      }
    })().catch(console.error)
  }, [])

  const stopMediaStream = (): void => {
    if (isMediaStream(stream)) {
      stream.getTracks().forEach((track) => {
        track.stop()
        stream.removeTrack(track)
      })

      setStatus('stopped')
    }
  }

  return { stream, error, status, stopMediaStream, startMediaStream }
}
