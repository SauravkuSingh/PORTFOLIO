import React, { useEffect } from 'react'
import { TypingAnimation } from '../components/ui/typing-animation';
import { CoolMode } from '../components/ui/cool-mode';
const About = () => {
    useEffect(() => {
    console.log("About page rendered");
  }, []);
  return (
    <div
      className="h-screen flex-col gap-5 text-white text-5xl flex items-center justify-center relative"
    ><TypingAnimation
            words={["About to code "]}
            loop
          />
    
          <CoolMode
            options={{
              particle: "💖",
              size: 12,
              speedUp: 18,
              speedHorz: 6,
            }}
          >
            <button className="bg-pink-400 p-2 rounded-xl text-xl">
              Click me 💖
            </button>
          </CoolMode></div>
  )
}

export default About