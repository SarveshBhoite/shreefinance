import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight, Zap } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="relative bg-[#141618] text-slate-300 border-t border-slate-800 pt-20 pb-12 font-sans overflow-hidden">
            {/* Top Emerald/Lime Gradient Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-lime-400 via-[#00e699] to-teal-400 shadow-[0_4px_20px_rgba(0,230,153,0.4)]"></div>
            
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-[#00c985] rounded-full blur-[120px]"></div>
                <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[100px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <Link href="/" className="inline-block transition-transform hover:scale-105">
                                <Image
                                    src="/shreelogobg.png"
                                    alt="ShreeFinance Logo"
                                    width={450}
                                    height={140}
                                    className="h-20 md:h-24 max-h-24 w-auto object-contain brightness-0 invert opacity-100 scale-110 origin-left"
                                />
                            </Link>
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-[#00e699] tracking-widest uppercase">
                                <Zap className="h-3.5 w-3.5 fill-[#00e699]" />
                                Elite Financial Partner
                            </div>
                        </div>
                        <p className="text-base text-slate-400 font-medium leading-[1.8]">
                            Leading the digital revolution in finance with transparent, hyper-secure, and instant solutions for every Indian.
                        </p>
                        <div className="flex gap-5 pt-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#00c985] hover:text-slate-950 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00c985]/30 transition-all duration-300 ring-1 ring-white/5">
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
                                    <Link href={item.href} className="text-slate-400 hover:text-[#00e699] font-bold text-base flex items-center group transition-colors">
                                        <ChevronRight className="h-4 w-4 mr-3 text-[#00c985] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
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
                                    <Link href={item.href} className="text-slate-400 hover:text-[#00e699] font-bold text-base flex items-center group transition-colors">
                                        <ChevronRight className="h-4 w-4 mr-3 text-[#00c985] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
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
                            <li>
                                <a
                                    href="https://maps.google.com/?q=Office+No.+D/201,+Siddhivinayak+Angan+Society,+Behind+Shree+Ji+Pure+Veg,+Near+Navale+Bridge,+Narhe,+Pune+-+411041"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-6 p-6 rounded-3xl bg-[#24272c] border border-slate-800 shadow-2xl hover:border-[#00c985] transition-all group cursor-pointer"
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-[#00c985]/15 border border-[#00c985]/30 flex items-center justify-center shrink-0 text-[#00c985] group-hover:bg-[#00c985] group-hover:text-slate-950 transition-colors">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <span className="text-slate-300 font-bold leading-relaxed text-sm group-hover:text-white transition-colors">
                                        Office No. D/201, Siddhivinayak Angan Society,<br /> 
                                        Behind Shree Ji Pure Veg, Near Navale Bridge,<br />
                                        Narhe, Pune - 411 041
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+917709936965"
                                    className="flex items-center gap-6 group hover:opacity-90 transition-all cursor-pointer"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                                        <Phone className="h-5 w-5 text-amber-400 group-hover:text-slate-950" />
                                    </div>
                                    <span className="text-white font-black text-lg group-hover:text-[#00e699] transition-colors">+91 77099 36965</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=care@shreefinance.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-6 group hover:opacity-90 transition-all cursor-pointer"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-[#00c985]/10 border border-[#00c985]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00c985] group-hover:text-slate-950 transition-all">
                                        <Mail className="h-5 w-5 text-[#00c985] group-hover:text-slate-950" />
                                    </div>
                                    <span className="text-white font-black text-lg group-hover:text-[#00e699] transition-colors">care@shreefinance.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col lg:row justify-between items-center gap-8 text-sm text-slate-500 font-bold">
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
