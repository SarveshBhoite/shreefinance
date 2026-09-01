import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight, Zap } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="relative bg-white dark:bg-[#141618] text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-16 pb-10 font-sans overflow-hidden transition-colors duration-300">
            {/* Top Emerald Gradient Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400 via-[#38bdf8] to-teal-500 shadow-[0_2px_12px_rgba(0,230,153,0.3)]"></div>
            
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-[#0284c7] rounded-full blur-[120px]"></div>
                <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[100px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Link href="/" className="inline-block transition-transform hover:scale-105">
                                <Image
                                    src="/shreelogobg.png"
                                    alt="ShreeFinance Logo"
                                    width={450}
                                    height={140}
                                    className="h-16 md:h-20 max-h-20 w-auto object-contain dark:brightness-0 dark:invert scale-105 origin-left"
                                />
                            </Link>
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-3.5 py-1 text-xs font-black text-sky-700 dark:text-[#38bdf8] tracking-widest uppercase">
                                    <Zap className="h-3.5 w-3.5 fill-emerald-600 dark:fill-[#38bdf8] text-sky-600 dark:text-[#38bdf8]" />
                                    Elite Financial Partner
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-[1.7]">
                            Leading the digital revolution in finance with transparent, hyper-secure, and instant solutions for every Indian.
                        </p>
                        <div className="flex gap-2.5 pt-2 flex-wrap">
                            <a
                                href="https://www.facebook.com/profile.php?id=61585560397130#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0284c7] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://twitter.com/shreefinance153"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter @shreefinance153"
                                className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0284c7] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.youtube.com/@Shree-Finance"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube @Shree-Finance"
                                className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#dc2626] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                            >
                                <Youtube className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.instagram.com/shreefinancec?igsi=ZzVsNXo0MThqZ2E0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram @shreefinancec"
                                className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#e1306c] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0284c7] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg mb-6 tracking-tight flex items-center gap-2">
                             Loan Products
                        </h4>
                        <ul className="space-y-4">
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
                                    <Link href={item.href} className="text-slate-600 font-semibold hover:text-[#0284c7] hover:translate-x-1.5 transition-all inline-flex items-center gap-2 group text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:w-3 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 text-lg mb-6 tracking-tight flex items-center gap-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Check Loan Eligibility", href: "/apply" },
                                { name: "EMI & Loan Calculators", href: "/calculators" },
                                { name: "Compare Loan Deals", href: "/compare" },
                                { name: "Track Application Status", href: "/track-status" },
                                { name: "DSA Partner Program", href: "/partner" },
                                { name: "Documents Required", href: "/documents-required" },
                                { name: "Rewards & Cashback", href: "/rewards-and-offers" },
                                { name: "Financial Blogs & Guides", href: "/blogs" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-slate-600 font-semibold hover:text-[#0284c7] hover:translate-x-1.5 transition-all inline-flex items-center gap-2 group text-sm">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:w-3 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-slate-900 text-lg mb-6 tracking-tight flex items-center gap-2">
                            Contact Us & Support
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://maps.google.com/?q=Office+No.+D/201,+Siddhivinayak+Angan+Society,+Behind+Shree+Ji+Pure+Veg,+Near+Navale+Bridge,+Narhe,+Pune+-+411041"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:border-[#0284c7] transition-all group cursor-pointer"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-slate-950 transition-colors">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <span className="text-slate-600 font-semibold leading-relaxed text-xs group-hover:text-slate-900 transition-colors">
                                        Office No. D/201, Siddhivinayak Angan Society,<br /> 
                                        Behind Shree Ji Pure Veg, Near Navale Bridge,<br />
                                        Narhe, Pune - 411 041
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+918830434945"
                                    className="flex items-center gap-4 group hover:opacity-90 transition-all cursor-pointer p-3 rounded-2xl bg-slate-50 border border-slate-200"
                                >
                                    <div className="h-9 w-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-slate-950 transition-all">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span className="text-slate-900 font-black text-base group-hover:text-[#0284c7] transition-colors">+91 88304 34945</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=shreefinancec@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group hover:opacity-90 transition-all cursor-pointer p-3 rounded-2xl bg-slate-50 border border-slate-200"
                                >
                                    <div className="h-9 w-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-slate-950 transition-all">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="text-slate-700 font-bold text-xs group-hover:text-[#0284c7] transition-colors">shreefinancec@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
                    <p>© 2026 Shree Finance. All Rights Reserved. India's Premier Multi-Bank Lending Marketplace.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-sky-700 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-sky-700 transition-colors">Terms of Service</Link>
                        <Link href="/security" className="hover:text-sky-700 transition-colors">RBI Security Standards</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
