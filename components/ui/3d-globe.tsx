'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

type MarkerType = {
  lat: number
  lng: number
  src: string
  label: string
}

type Globe3DProps = {
  markers?: MarkerType[]
  config?: {
    atmosphereColor?: string
    atmosphereIntensity?: number
    bumpScale?: number
    autoRotateSpeed?: number
  }
  onMarkerClick?: (marker: MarkerType) => void
  onMarkerHover?: (marker: MarkerType | null) => void
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function Globe({ config, markers, onMarkerClick, onMarkerHover }: Omit<Globe3DProps, 'markers'> & { markers: MarkerType[] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current && config?.autoRotateSpeed) {
      groupRef.current.rotation.y += config.autoRotateSpeed * 0.001
    }
  })

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const context = canvas.getContext('2d')!
    
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#1a365d')
    gradient.addColorStop(0.5, '#2c5282')
    gradient.addColorStop(1, '#1a365d')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`
      context.fillRect(x, y, 2, 2)
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  const markerMeshes = useMemo(() => {
    return markers.map((marker, index) => {
      const position = latLngToVector3(marker.lat, marker.lng, 2.01)
      return (
        <mesh
          key={index}
          position={position}
          onClick={() => onMarkerClick?.(marker)}
          onPointerOver={() => onMarkerHover?.(marker)}
          onPointerOut={() => onMarkerHover?.(null)}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
        </mesh>
      )
    })
  }, [markers, onMarkerClick, onMarkerHover])

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          bumpScale={config?.bumpScale ?? 0.05}
        />
      </mesh>
      
      <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color={config?.atmosphereColor ?? '#4da6ff'}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {markerMeshes}
    </group>
  )
}

export function Globe3D({ markers = [], config = {}, onMarkerClick, onMarkerHover }: Globe3DProps) {
  return (
    <div className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Globe
          markers={markers}
          config={config}
          onMarkerClick={onMarkerClick}
          onMarkerHover={onMarkerHover}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
