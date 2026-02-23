import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Wallet, CreditCard, ShieldCheck, TrendingUp, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Instant Loans",
        description: "Personal, Home & Business loans approved in minutes.",
        icon: Wallet,
        href: "/loans/personal-loan",
        features: ["Low Rates", "Quick Disbursal"],
        color: "bg-blue-600",
        lightColor: "bg-blue-100 text-blue-600",
    },
    {
        title: "Premium Cards",
        description: "Lifestyle credit cards with zero joining fees & max rewards.",
        icon: CreditCard,
        href: "/cards/credit-cards",
        features: ["Lounge Access", "Cashback"],
        color: "bg-purple-600",
        lightColor: "bg-purple-100 text-purple-600",
    },
    {
        title: "Insurance",
        description: "Comprehensive protection for your family, car & assets.",
        icon: ShieldCheck,
        href: "/insurance/health",
        features: ["Cashless Claims", "Tax Benefits"],
        color: "bg-green-600",
        lightColor: "bg-green-100 text-green-600",
    },
    {
        title: "Investments",
        description: "High-growth Mutual Funds & Stocks to build your wealth.",
        icon: TrendingUp,
        href: "/investments/mutual-funds",
        features: ["Expert Advice", "Zero Brokerage"],
        color: "bg-orange-600",
        lightColor: "bg-orange-100 text-orange-600",
    },
];

export function ServicesSnapshot() {
    return (
        <section className="py-20 md:py-28 relative">
            <div className="absolute inset-0 bg-slate-50/50 dark:bg-black/50 pointer-events-none"></div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-gradient">
                            Holistic Financial Solutions
                        </h2>
                        <p className="text-muted-foreground md:text-lg max-w-2xl font-light">
                            Everything you need to manage, grow, and protect your money—all in one place.
                        </p>
                    </div>
                    <Button variant="ghost" className="hidden md:inline-flex group text-blue-600 font-semibold hover:bg-blue-50">
                        View All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, idx) => (
                        <Card key={idx} className="group glass-card border-none hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${service.color}`}></div>

                            <CardHeader className="pb-4">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", service.lightColor)}>
                                    <service.icon className="h-7 w-7" />
                                </div>
                                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-2 leading-relaxed">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="space-y-3">
                                    {service.features.map((feat, i) => (
                                        <div key={i} className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <div className={`h-1.5 w-1.5 rounded-full mr-2 ${service.color}`}></div>
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Link href={service.href} className="w-full">
                                    <Button variant="ghost" className="w-full justify-between group/btn hover:bg-slate-100 dark:hover:bg-slate-800">
                                        Check Offers
                                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="w-full">View All Services</Button>
                </div>
            </div>
        </section>
    )
}
