import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function SiteFooter() {
    return (
        <footer className="relative bg-black dark:bg-black text-slate-300 border-t border-primary/20 pt-20 pb-12 font-sans overflow-hidden">
            {/* Water-inspired Background Gradient Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-sky-300 to-accent shadow-[0_4px_20px_rgba(14,165,233,0.3)]"></div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-accent rounded-full blur-[100px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <Link href="/" className="inline-block transition-transform hover:scale-105">
                                <Image
                                    src="/shreelogobg.png"
                                    alt="ShreeFinance Logo"
                                    width={240}
                                    height={60}
                                    className="h-14 w-auto object-contain brightness-0 invert opacity-100"
                                />
                            </Link>
                            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-black text-accent tracking-widest uppercase">
                                <Zap className="h-3.5 w-3.5 fill-accent" />
                                Elite Financial Partner
                            </div>
                        </div>
                        <p className="text-base text-slate-400 font-medium leading-[1.8]">
                            Leading the digital revolution in finance with transparent, hyper-secure, and instant solutions for every Indian.
                        </p>
                        <div className="flex gap-5 pt-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 ring-1 ring-white/5">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-white text-xl mb-10 tracking-tight flex items-center gap-2">
                             Loan Products
                        </h4>
                        <ul className="space-y-5">
                            {[
                                { name: "Personal Loan", href: "/loans/personal-loan" },
                                { name: "Home Loan", href: "/loans/home-loan" },
                                { name: "Business Loan", href: "/loans/business-loan" },
                                { name: "Car Loan", href: "/loans/car-loan" },
                                { name: "Mudra Loan", href: "/loans/mudra-loan" },
                                { name: "Govt Schemes", href: "/loans/government-schemes" },
                                { name: "Education Loan", href: "/loans/education-loan" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-slate-400 hover:text-accent font-bold text-base flex items-center group transition-colors">
                                        <ChevronRight className="h-4 w-4 mr-3 text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-white text-xl mb-10 tracking-tight flex items-center gap-2">
                            Other Services
                        </h4>
                        <ul className="space-y-5">
                            {[
                                { name: "Credit Cards", href: "/cards/credit-cards" },
                                { name: "Health Insurance", href: "/insurance/health" },
                                { name: "Life Insurance", href: "/insurance/life" },
                                { name: "Mutual Funds", href: "/investments/mutual-funds" },
                                { name: "Stock Market", href: "/investments/stocks" },
                                { name: "Vehicle Insurance", href: "/insurance/vehicle" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary font-bold text-base flex items-center group transition-colors">
                                        <ChevronRight className="h-4 w-4 mr-3 text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-white text-xl mb-10 tracking-tight flex items-center gap-2">
                            Support Headquarters
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 ring-1 ring-white/5 shadow-2xl">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-slate-400 font-bold leading-relaxed">
                                    Office No. D/201, Siddhivinayak Angan Society,<br /> 
                                    Behind Shree Ji Pure Veg, Near Navale Bridge,<br />
                                    Narhe, Pune - 411 041
                                </span>
                            </li>
                            <li className="flex items-center gap-6 group">
                                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                                    <Phone className="h-5 w-5 text-accent group-hover:text-white" />
                                </div>
                                <span className="text-white font-black text-lg">+91 88304 34945</span>
                            </li>
                            <li className="flex items-center gap-6 group">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                                </div>
                                <span className="text-white font-black text-lg">care@shreefinance.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col lg:row justify-between items-center gap-8 text-sm text-slate-500 font-bold">
                    <p className="text-center lg:text-left">
                        © {new Date().getFullYear()} ShreeFinance Corporation. RBI Registered Financial Platform. All trade logos belong to respective owners.
                    </p>
                    <div className="flex flex-wrap justify-center gap-10">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
