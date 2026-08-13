"use client";

export function ThemeBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#181a1d]">
            {/* Top-Left Ambient Emerald Glow */}
            <div className="absolute -top-[15%] -left-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-emerald-500/10 via-[#00c985]/5 to-transparent blur-[140px] animate-pulse-slow" />
            
            {/* Mid-Right Gold & Teal Ambient Glow */}
            <div className="absolute top-[35%] -right-[15%] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-amber-400/5 via-teal-500/5 to-transparent blur-[150px] animate-float-delayed" />
            
            {/* Bottom-Left Deep Emerald Ambient Glow */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-[#00c985]/10 via-emerald-600/5 to-transparent blur-[160px] animate-float" />
            
            {/* Subtle Grid Dot Texture */}
            <div 
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(#00e699 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                }}
            />
        </div>
    );
}
