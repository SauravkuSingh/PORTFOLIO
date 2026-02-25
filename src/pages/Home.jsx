
import { TypingAnimation } from "@/components/ui/typing-animation";
import { CoolMode } from "@/components/ui/cool-mode";

const Home = () => {
  return (
    <div className="flex items-center flex-col gap-5 justify-center text-6xl font-bold text-white h-screen z-10 relative">
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
        <button className="bg-pink-400 p-2 rounded-xl text-xl">
          Click me 💖
        </button>
      </CoolMode>
    </div>
  );
};

export default Home;
