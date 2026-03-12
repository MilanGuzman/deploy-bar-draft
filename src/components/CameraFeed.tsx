import { useEffect, useRef } from 'react'

/**
 * CameraFeed — renderiza el stream de la cámara trasera como fondo del AR.
 * IMPORTANTE: usa z-index bajo para NO tapar la navbar ni otros overlays.
 */
export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let stream: MediaStream | null = null

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((s) => {
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch(console.error)

    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  return (
    <video
  style={{
    position: 'fixed',
    top: '50px',  // ← empieza debajo del navbar
    left: 0,
    width: '100%',
    height: `calc(100% - 50px)`,
    objectFit: 'cover',
    zIndex: 0,
  }}
/>
  )
}