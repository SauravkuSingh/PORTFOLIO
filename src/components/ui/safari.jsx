import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, RefreshCcw, Share, Plus } from "lucide-react";

export const Safari = ({
  url = "magicui.design",
  imageSrc,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-2xl",
        className,
      )}
    >
      {/* Top chrome */}
      <div className="flex items-center gap-3 px-3 py-2.5 bg-[#262626] border-b border-white/5">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* Nav arrows */}
        <div className="hidden sm:flex items-center gap-1 text-zinc-500 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" />
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center justify-center gap-2 max-w-md mx-auto bg-[#3a3a3a] rounded-md text-[11px] sm:text-xs text-zinc-300 px-3 py-1 truncate">
          <span className="text-zinc-500">🔒</span>
          <span className="truncate font-mono">{url}</span>
        </div>
        {/* Right icons */}
        <div className="hidden sm:flex items-center gap-2 text-zinc-500 shrink-0">
          <RefreshCcw className="w-3.5 h-3.5" />
          <Share className="w-3.5 h-3.5" />
          <Plus className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Tab strip */}
      <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-[#1f1f1f] border-b border-white/5">
        <div className="px-3 py-1 rounded-md bg-[#2e2e2e] text-[10px] text-zinc-300 font-mono truncate max-w-[180px]">
          {url}
        </div>
        <div className="px-3 py-1 rounded-md text-[10px] text-zinc-500 font-mono">
          + New Tab
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative bg-black aspect-video w-full overflow-hidden",
          contentClassName,
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Safari;
