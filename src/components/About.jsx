import React, { useEffect } from 'react'
const About = () => {
    useEffect(() => {
    console.log("About page rendered");
  }, []);
  return (
    <div
      className="h-screen text-white text-5xl flex items-center justify-center relative"
    >About</div>
  )
}

export default About