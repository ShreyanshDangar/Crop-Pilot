/*
 * Landing page 3D scene.
 * Used: React, @react-three/fiber, @react-three/drei, maath, three.
 * Rendered: an interactive 3D gallery of crop imagery with animated motion and lighting.
 * Removed for open-weight release.
 */

import { useEffect } from 'react'

export default function GalleryHeroScene({ onReady }) {
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return null
}
