export const MockupShop = () => (
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 flex flex-col gap-2">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
      </div>
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-md bg-white/10 border border-white/5"
          />
        ))}
      </div>
    </div>
  </div>
);

export const MockupSocial = () => (
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500" />
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-2/3 bg-white/30 rounded-full" />
          <div className="h-1 w-1/3 bg-white/15 rounded-full" />
        </div>
      </div>
      <div className="space-y-1.5 flex-1">
        <div className="h-1.5 w-full bg-white/15 rounded-full" />
        <div className="h-1.5 w-5/6 bg-white/15 rounded-full" />
        <div className="h-1.5 w-3/4 bg-white/15 rounded-full" />
      </div>
      <div className="flex gap-2">
        <div className="h-1.5 w-8 bg-white/20 rounded-full" />
        <div className="h-1.5 w-8 bg-white/20 rounded-full" />
      </div>
    </div>
  </div>
);

export const MockupTasks = () => (
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 flex flex-col gap-2">
      <div className="h-2 w-1/3 bg-white/30 rounded-full" />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1.5"
        >
          <span
            className={`w-2.5 h-2.5 rounded-sm border ${
              i < 2
                ? "bg-emerald-400/70 border-emerald-400/70"
                : "border-white/30"
            }`}
          />
          <div
            className={`h-1.5 ${
              i % 2 === 0 ? "w-3/4" : "w-2/3"
            } bg-white/20 rounded-full`}
          />
        </div>
      ))}
    </div>
  </div>
);

export const MockupWeather = () => (
  <div className="absolute inset-0 flex items-center justify-center p-4">
    <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="h-1.5 w-12 bg-white/30 rounded-full" />
          <div className="h-1 w-8 bg-white/15 rounded-full" />
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-300 to-indigo-500 shadow-lg shadow-sky-500/30" />
      </div>
      <div className="flex items-end gap-1 flex-1">
        <span className="text-2xl font-bold text-white/80 leading-none">28°</span>
        <span className="text-[9px] text-white/50 mb-0.5">Sunny</span>
      </div>
      <div className="flex gap-1.5 justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 rounded bg-white/5 py-1.5"
          >
            <div className="h-1 w-3 bg-white/30 rounded-full" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const renderMockup = (kind) => {
  if (kind === "shop") return <MockupShop />;
  if (kind === "social") return <MockupSocial />;
  if (kind === "tasks") return <MockupTasks />;
  if (kind === "weather") return <MockupWeather />;
  return null;
};
