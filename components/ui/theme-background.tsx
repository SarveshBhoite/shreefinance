"use client";

export function ThemeBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#f8fafc] dark:bg-[#121417] transition-colors duration-300">
            {/* Top-Left Ambient Emerald Glow */}
            <div className="absolute -top-[15%] -left-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-emerald-400/10 via-[#00c985]/8 to-transparent blur-[140px] animate-pulse-slow" />
            
            {/* Mid-Right Teal Ambient Glow */}
            <div className="absolute top-[35%] -right-[15%] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-teal-400/8 via-emerald-300/8 to-transparent blur-[150px] animate-float-delayed" />
            
            {/* Bottom-Left Deep Emerald Ambient Glow */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-[#00c985]/8 via-emerald-500/5 to-transparent blur-[160px] animate-float" />
            
            {/* Subtle Grid Dot Texture on Light / Dark */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] dark:mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />
        </div>
    );
}
