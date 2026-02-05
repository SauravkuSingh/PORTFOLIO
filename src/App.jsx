
import './App.css'
import { TypingAnimation } from '@/components/ui/typing-animation'


function App() {

  return (
    <>
    
    <div className='flex items-center justify-center text-6xl relative z-10 text-6xl font-bold text-white min-h-screen'>

      <TypingAnimation words={["I'm Designing 🎨", "Building 🔨","So👽", "Stay Tuned 🚀"]} loop />
    </div>
   
    </>
  )
}

export default App
