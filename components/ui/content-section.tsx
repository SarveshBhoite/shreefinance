import { cn } from "@/lib/utils";
import Image from "next/image";

interface ContentSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function ContentSection({
    title,
    description,
    imageSrc,
    imageAlt,
    reverse = false,
    className,
    children,
}: ContentSectionProps) {
    return (
        <section className={cn("py-20 md:py-32 overflow-hidden", className)}>
            <div className="container px-4 md:px-6">
                <div
                    className={cn(
                        "grid gap-12 lg:grid-cols-2 items-center",
                        reverse ? "lg:grid-flow-dense" : ""
                    )}
                >
                    {/* Text Content */}
                    <div className={cn("space-y-6", reverse ? "lg:col-start-2" : "")}>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {title}
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                            {description}
                        </p>
                        {children && <div className="pt-4">{children}</div>}
                    </div>

                    {/* Image Content */}
                    <div className={cn("relative group", reverse ? "lg:col-start-1" : "")}>
                        {/* Abstract Background Element */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[2rem] transform rotate-3 scale-105 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />

                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                            <div className="aspect-[4/3] w-full relative">
                                {/* Use a placeholder if imageSrc is external and not configured, but ideally real images */}
                                {/* For now, using standard img tag if next/image errors might occur with domains, but trying next/image first */}
                                <img
                                    src={imageSrc}
                                    alt={imageAlt}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
