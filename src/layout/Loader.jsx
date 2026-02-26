import React from 'react'

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

const Loader = () => {
  return (
    <div className="flex items-center fixed inset-0  bg-black justify-center w-full h-screen">
      <Terminal className="h-60">

        <TypingAnimation>
          &gt; npm run build-portfolio
        </TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔️ Initializing modules...
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          ✔️ Loading components...
        </AnimatedSpan>

        <AnimatedSpan className="text-green-500">
          ✔️ Connecting to universe...
        </AnimatedSpan>

        <AnimatedSpan className="text-blue-500">
          ℹ️ Compiling creativity engine...
        </AnimatedSpan>

        <TypingAnimation className="text-muted-foreground">
          Launching Saurav.dev 🚀
        </TypingAnimation>

      </Terminal>
    </div>
  );
};

Loader.displayName = "Loader";
export default Loader;