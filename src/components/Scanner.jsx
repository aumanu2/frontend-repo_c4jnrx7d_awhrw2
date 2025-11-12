import { useEffect, useMemo, useState } from 'react'

/*
  Scanner component using MindAR.js (A-Frame integration)
  - Uses CDN scripts included in index.html
  - Tracks a sample target and overlays a video that sticks to the image
  - Replace TARGET_URL and VIDEO_URL with your own assets as needed
*/

const TARGET_URL = 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card.mind'
// Example hosted video (can be MP4 or remote URL). Replace with your own Cloudinary/Firebase URL
const VIDEO_URL = 'https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/augmented-video.mp4'

export default function Scanner() {
  const [permissionAsked, setPermissionAsked] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState('')

  // iOS WebKit inline video fix and autoplay policies
  useEffect(() => {
    const tryAutoplay = async () => {
      const videoEl = document.getElementById('ar-video')
      if (videoEl) {
        videoEl.setAttribute('muted', 'true')
        videoEl.setAttribute('playsinline', 'true')
        videoEl.setAttribute('webkit-playsinline', 'true')
        try {
          await videoEl.play()
        } catch (_) { /* ignore initial play errors */ }
      }
    }

    tryAutoplay()
  }, [])

  // Handle camera permission prompt for UX
  useEffect(() => {
    const ask = async ()n      => {
        try {
          // Hint the permission flow by requesting camera stream once
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            // Immediately stop tracks; MindAR will manage its own stream
            stream.getTracks().forEach(t => t.stop())
          }
          setPermissionAsked(true)
          setIsReady(true)
        } catch (e) {
          setError('Camera access is required to start scanning.')
          setPermissionAsked(true)
        }
      }
    ask()
  }, [])

  // MindAR events: start video when target is found
  useEffect(() => {
    const onFound = () => {
      const videoEl = document.getElementById('ar-video')
      if (videoEl) {
        videoEl.muted = true
        videoEl.play().catch(() => {})
      }
    }
    const onLost = () => {
      // Pause to save battery; comment out to keep playing when target lost
      const videoEl = document.getElementById('ar-video')
      if (videoEl) {
        videoEl.pause()
      }
    }

    document.addEventListener('targetFound', onFound)
    document.addEventListener('targetLost', onLost)
    return () => {
      document.removeEventListener('targetFound', onFound)
      document.removeEventListener('targetLost', onLost)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#FFF5E1]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <a href="/" className="rounded-full bg-white/90 text-gray-700 px-4 py-2 shadow-sm">Back</a>
        <div className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">Point your camera at the image</div>
      </div>

      {/* Loading overlay */}
      {!isReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FFEFEF]">
          <div className="h-12 w-12 rounded-full border-4 border-[#FFD6D6] border-t-transparent animate-spin" />
          <p className="mt-4 text-gray-600">Preparing camera...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-x-0 top-16 z-20 mx-4 rounded-xl bg-red-50 text-red-700 p-3 text-sm shadow">
          {error}
        </div>
      )}

      {/* AR Scene */}
      <div className="relative z-0 w-full h-screen">
        {/* Using A-Frame + MindAR custom elements (provided by CDN scripts in index.html) */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <a-scene
          embedded
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          mindar-image={`uiScanning: true; uiLoading: true; filterMinCF: 0.0001; filterBeta: 0.01; warmupTolerance: 5; imageTargetSrc: ${TARGET_URL}; autoStart: true;`}
          class="w-full h-full"
        >
          {/* eslint-disable-next-line react/no-unknown-property */}
          <a-assets>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <video id="ar-video" src={VIDEO_URL} preload="auto" loop={true} muted playsInline webkit-playsinline="true" crossOrigin="anonymous"></video>
          </a-assets>

          {/* eslint-disable-next-line react/no-unknown-property */}
          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

          {/* eslint-disable-next-line react/no-unknown-property */}
          <a-entity mindar-image-target="targetIndex: 0">
            {/* Map 16:9 video to a plane sized 1 x 0.5625 */}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <a-video src="#ar-video" width="1" height="0.5625" position="0 0 0" rotation="0 0 0"></a-video>
          </a-entity>
        </a-scene>
      </div>
    </div>
  )
}
