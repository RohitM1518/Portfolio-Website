import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function EarthMesh({ mousePosition, isHovered }) {
  const meshRef = useRef()
  const { camera } = useThree()
  
  // Responsive scaling based on screen size
  const isMobile = window.innerWidth <= 768
  const earthScale = isMobile ? 1.8 : 1.5
  const earthPosition = isMobile ? [-1.2, 0, 0] : [0, 0, 0]
  
  // Load realistic Earth textures
  const earthTexture = useTexture({
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    bumpMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
    cloudsMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  })
  
  // Create realistic Earth material
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture.map,
    bumpMap: earthTexture.bumpMap,
    bumpScale: 0.05,
    specularMap: earthTexture.specularMap,
    specular: new THREE.Color('grey'),
    shininess: 10,
    transparent: true,
    opacity: 0.9
  })
  
  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation - faster when hovered
      const rotationSpeed = isHovered ? 0.003 : 0.001
      meshRef.current.rotation.y += rotationSpeed
      
      // Mouse interaction - more responsive when hovered
      if (mousePosition) {
        const tiltIntensity = isHovered ? 0.4 : 0.15
        const lerpSpeed = isHovered ? 0.08 : 0.015
        
        const targetRotationX = (mousePosition.y - 0.5) * tiltIntensity
        const targetRotationZ = (mousePosition.x - 0.5) * tiltIntensity
        
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          targetRotationX,
          lerpSpeed
        )
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          targetRotationZ,
          lerpSpeed
        )
      }
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={earthScale} position={earthPosition}>
      <primitive object={earthMaterial} attach="material" />
    </Sphere>
  )
}

function Earth({ className = "" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef()

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseenter', handleMouseEnter)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseenter', handleMouseEnter)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div 
      ref={canvasRef}
      className={`earth-container ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Black fade overlay for mobile - reduced intensity */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent md:hidden"></div>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#4B9CD3" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#ffffff" />
        <EarthMesh mousePosition={mousePosition} isHovered={isHovered} />
      </Canvas>
    </div>
  )
}

export default Earth 