import React from 'react'
import  FloatingLines  from '@/components/FloatingLines'
const Background = () => {
  return (
    <FloatingLines 
    enabledWaves={["top","middle","bottom"]}
    // Array - specify line count per wave; Number - same count for all waves
    lineCount={5}
    // Array - specify line distance per wave; Number - same distance for all waves
    lineDistance={5}
    bendRadius={5}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
  />
  )
}

export default Background