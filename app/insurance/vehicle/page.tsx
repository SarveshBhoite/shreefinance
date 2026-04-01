"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Car, Shield, ShieldCheck, Zap, FileText, Bike, AlertTriangle, Wrench, Sparkles, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { motion } from "framer-motion";
import { DynamicHeroWrapper } from "@/components/dynamic-hero-wrapper";

export default function VehicleInsurancePage() {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        vehicleNum: "",
        vehicleType: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            type: "Vehicle Insurance Inquiry",
            ...formData
        });
    };

    const scrollToForm = () => {
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-primary/30 font-sans">
            <DynamicHeroWrapper page="vehicle-insurance">
                {/* Ocean Blue Hero Section - Road Safety Theme */}
                <section className="relative pt-32 pb-40 overflow-hidden bg-sky-950 text-white">
                    {/* Safety Grid Background - Blue Variant */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent"></div>

                    {/* Radar Effect - Ocean Blue */}
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] border border-primary/20 rounded-full -translate-y-1/2 animate-[spin_12s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] border border-primary/10 rounded-full -translate-y-1/2 animate-[spin_6s_linear_infinite_reverse]"></div>

                    <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center mx-auto">
                        <div className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-black text-sky-200 tracking-wide"
                            >
                                <Navigation className="h-4 w-4 text-accent" />
                                <span>Total Protection Suite</span>
                            </motion.div>

                            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight">
                                Drive with <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-accent">Liquid Confidence.</span>
                            </h1>

                            <p className="text-xl text-sky-100/70 max-w-lg leading-relaxed font-medium">
                                Comprehensive coverage for your wheels with cashless claims at 5000+ elite garages. 24x7 Roadside Assistance included by default.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-2xl shadow-primary/40 bg-primary hover:bg-sky-600 text-white font-black border border-white/10 transition-all hover:scale-105 active:scale-95" onClick={scrollToForm}>
                                    Get Instant Quote
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-primary/10 rounded-2xl ring-1 ring-primary/20"><Zap className="h-5 w-5 text-primary" /></div>
                                    <div>
                                        <p className="font-black text-white text-sm uppercase tracking-tighter">Instant</p>
                                        <p className="text-[10px] text-sky-300/50 font-bold uppercase tracking-widest leading-none">Policy Issued</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-accent/10 rounded-2xl ring-1 ring-accent/20"><Wrench className="h-5 w-5 text-accent" /></div>
                                    <div>
                                        <p className="font-black text-white text-sm uppercase tracking-tighter">Cashless</p>
                                        <p className="text-[10px] text-sky-300/50 font-bold uppercase tracking-widest leading-none">Network Repairs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Hero Element - 3D Ocean Shield */}
                        <div className="relative hidden lg:block h-[500px]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Floating Premium Shield */}
                                <motion.div
                                    className="relative w-80 h-96 bg-gradient-to-br from-primary to-sky-900 rounded-[60px] shadow-[0_30px_100px_rgba(14,165,233,0.4)] flex items-center justify-center border-4 border-white/20"
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                                    <div className="absolute -top-10 -right-10 animate-bounce">
                                        <div className="p-4 bg-accent rounded-3xl shadow-2xl border-4 border-white">
                                            <Sparkles className="h-8 w-8 text-white fill-white" />
                                        </div>
                                    </div>
                                    <ShieldCheck className="h-44 w-44 text-white drop-shadow-2xl" />

                                    {/* Orbiting Vehicle Icons */}
                                    <motion.div 
                                        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute -right-12 top-24 bg-white/10 backdrop-blur-3xl p-4 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-1"
                                    >
                                        <Car className="h-8 w-8 text-sky-300" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest mt-1">Car</span>
                                    </motion.div>
                                    <motion.div 
                                        animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                                        transition={{ repeat: Infinity, duration: 5 }}
                                        className="absolute -left-12 bottom-24 bg-white/10 backdrop-blur-3xl p-4 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-1"
                                    >
                                        <Bike className="h-8 w-8 text-accent" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest mt-1">Bike</span>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </DynamicHeroWrapper>

            {/* Premium Emergency Strip */}
            <div className="bg-accent/10 border-y border-accent/20 py-6">
                <div className="container px-4 text-center mx-auto">
                    <p className="text-accent font-black flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                        <AlertTriangle className="h-6 w-6 fill-accent text-slate-900" />
                        Accidents are unpredictable. Our 24x7 Emergency Assistance is inevitable.
                    </p>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-20 lg:py-28 grid lg:grid-cols-[1fr_400px] gap-16 mx-auto">
                {/* Left Column: Content */}
                <div className="space-y-20">
                    <ContentSection
                        title="Road Safety Redefined"
                        description="Your vehicle isn't just an asset; it's your daily driver for success. Our Comprehensive Vehicle Insurance plans offer 360-degree protection against the unpredictable—from urban floods and seismic shifts to unexpected theft. With add-ons like 'Return to Invoice' and 'Ocean Dep Protection', we ensure that your vehicle's value remains as consistent as your peace of mind. Experience the fluidity of instant policy generation and the wave of support from 5000+ network garages nationwide."
                        imageSrc="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Premium vehicle safety"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 transition-all hover:bg-primary/10 group">
                                <h4 className="font-black text-primary text-2xl mb-2 group-hover:scale-105 transition-transform tracking-tight">Zero Dep</h4>
                                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">Full Market Value Recovery</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/20 transition-all hover:bg-accent/10 group">
                                <h4 className="font-black text-accent text-2xl mb-2 group-hover:scale-105 transition-transform tracking-tight">Cashless</h4>
                                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] leading-relaxed">At 5000+ Elite Stations</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black flex items-center gap-4 text-slate-900 dark:text-white">
                                <div className="p-4 bg-primary/10 rounded-2xl"><Shield className="text-primary h-8 w-8" /></div>
                                Elite Coverage Details
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Third Party Liability Shell", content: "Mandatory by law. Covers damages to third-party property or person involved in accident, secured by the ShreeFinance guarantee." },
                                    { title: "Personal Asset Protection", content: "Covers damages to your own vehicle due to accidents, fire, theft, or natural calamities. Total protection against the unexpected." },
                                    { title: "Executive Accident Cover", content: "Compulsory premium cover of ₹15 Lakhs for the owner-driver. Ensuring your family's financial security is never at risk." },
                                ]}
                            />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-black flex items-center gap-4 text-slate-900 dark:text-white">
                                <div className="p-4 bg-accent/10 rounded-2xl"><ShieldCheck className="text-accent h-8 w-8" /></div>
                                Essential Add-ons
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Zero Depreciation Max", content: "Get full claim amount without deduction for depreciation on parts replaced. Ideal for new luxury vehicles." },
                                    { title: "Roadside Rescue 24/7", content: "Emergency help for flat tyre, towing, battery jumpstart, and fuel delivery. We bring the help to you, wherever you are." },
                                    { title: "Industrial Engine Defense", content: "Covers repair costs for engine damage due to water ingression or oil leakage. A critical shield for the monsoon season." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-32">
                        <Card className="glass-card bg-white/90 dark:bg-slate-900/90 border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden rounded-[2.5rem] ring-1 ring-primary/5">
                            <CardHeader className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 pb-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                        <Car className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-accent text-slate-900 px-4 py-1.5 rounded-full shadow-lg">Save 80%</span>
                                </div>
                                <CardTitle className="text-2xl font-black tracking-tight leading-none mb-2">Quote Your Policy</CardTitle>
                                <p className="text-sky-100/70 text-xs font-bold uppercase tracking-widest">Connect with our Claims Expert</p>
                            </CardHeader>
                            <CardContent className="p-8 -mt-6 bg-white dark:bg-slate-950 rounded-t-[2.5rem] relative z-10 shadow-2xl">
                                {isSuccess ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                        <div className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
                                            <CheckCircle2 className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Sync'd</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">A safety expert will contact you shortly.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Holder Name</label>
                                            <Input
                                                placeholder="Full Legal Name"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contact String</label>
                                            <Input
                                                placeholder="10-digit Number"
                                                className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Wheels</label>
                                                <select
                                                    className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50 dark:bg-sky-950/20 px-6 py-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all shadow-sm"
                                                    value={formData.vehicleType}
                                                    onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Car">Car</option>
                                                    <option value="Bike">Bike</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Registration</label>
                                                <Input
                                                    placeholder="MH12AB1234"
                                                    className="h-14 bg-slate-50 dark:bg-sky-950/20 border-slate-100 dark:border-primary/10 rounded-2xl font-bold px-6 focus:ring-primary shadow-sm"
                                                    value={formData.vehicleNum}
                                                    onChange={e => setFormData({ ...formData, vehicleNum: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-primary hover:bg-sky-600 text-white font-black h-16 text-lg rounded-2xl shadow-2xl shadow-primary/20 mt-4 transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-widest border border-white/10">
                                            Secure Asset
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </aside>
            </div>
        </div>
    );
}
