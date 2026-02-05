import "./App.css";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Dock, DockIcon } from "./components/ui/dock";
import { Home, Search, Settings } from "lucide-react";
import { CoolMode } from "./components/ui/cool-mode";

function App() {
  return (
    <>
      <div className="flex items-center flex-col gap-5 justify-center relative z-10 text-6xl font-bold text-white min-h-screen">
        <TypingAnimation
          words={["I'm Designing 🎨", "Building 🔨", "So👽", "Stay Tuned 🚀"]}
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
          <button className="bg-pink-400 p-2 rounded-xl text-xl">Click me 💖</button>
        </CoolMode>

        <div>
          <Dock className="fixed  z-12 bottom-4 left-1/2 -translate-x-1/2">
            <DockIcon>
              <Home />
            </DockIcon>
            {/* <DockIcon>
              <Settings />
            </DockIcon>
            <DockIcon>
              <Search />
            </DockIcon> */}
          </Dock>
        </div>
      </div>
    </>
  );
}

export default App;
