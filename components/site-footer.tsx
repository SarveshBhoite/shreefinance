import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from "lucide-react"

export function SiteFooter() {
    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pb-10">
            {/* Top Bar with decorative gradient */}
            <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500"></div>

            <div className="container py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white tracking-tight">ShreeFinance</h3>
                            <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Premium Banking Partners</p>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Empowering millions with transparent, secure, and instant financial solutions.
                            Your wealth, our priority.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white text-lg">Key Products</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: "Personal Loan", href: "/loans/personal-loan" },
                                { name: "Home Loan", href: "/loans/home-loan" },
                                { name: "Credit Cards", href: "/cards/credit-cards" },
                                { name: "Health Insurance", href: "/insurance/health" },
                                { name: "Mutual Funds", href: "/investments/mutual-funds" },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="flex items-center group hover:text-amber-400 transition-colors">
                                        <ChevronRight className="h-3 w-3 mr-2 text-slate-600 group-hover:text-amber-500 transition-colors" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
                        <ul className="space-y-3 text-sm">
                            {["About Us", "Careers", "Privacy Policy", "Terms of Service", "Compliance"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="flex items-center group hover:text-amber-400 transition-colors">
                                        <ChevronRight className="h-3 w-3 mr-2 text-slate-600 group-hover:text-amber-500 transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white text-lg">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <span>Level 5, Future Towers,<br />Pune, Maharashtra 411001</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                                <span className="text-white">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                                <span className="text-white">support@shreefinance.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} ShreeFinance. All rights reserved. Trade logos belong to respective owners.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Privacy</Link>
                        <Link href="#" className="hover:text-white">Cookies</Link>
                        <Link href="#" className="hover:text-white">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
