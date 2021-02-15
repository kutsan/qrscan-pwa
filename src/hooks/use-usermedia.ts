import { useEffect, useState } from 'react'

const isMediaStream = (
  candidate: MediaStream | MediaSource | Blob | null
): candidate is MediaStream => candidate !== null && 'getTracks' in candidate

type UseUserMediaStatusType = 'pending' | 'resolved' | 'rejected' | 'stopped'
type UseUserMediaType = {
  stream: MediaStream | null
  error: Error | null
  status: UseUserMediaStatusType
  stopMediaStream: () => void
  startMediaStream: () => void
}

const useUserMedia = (): UseUserMediaType => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<UseUserMediaStatusType>('pending')

  const startMediaStream = async () => {
    setStatus('pending')

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      })

      setStream(userStream)
      setStatus('resolved')
    } catch (err) {
      setError(err)
      setStatus('rejected')
    }
  }

  useEffect(() => {
    startMediaStream()
  }, [])

  const stopMediaStream = () => {
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

export default useUserMedia
