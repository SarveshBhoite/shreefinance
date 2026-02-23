"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Car, Shield, ShieldCheck, Zap, FileText, Bike, AlertTriangle, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEmailForm } from "@/hooks/use-email-form";
import { cn } from "@/lib/utils";
import { ContentSection } from "@/components/ui/content-section";
import { SimpleAccordion } from "@/components/ui/simple-accordion";
import { motion } from "framer-motion";

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
        <div className="pb-20 bg-slate-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
            {/* Unique Hero Section - Road Safety Theme */}
            <section className="relative pt-32 pb-32 overflow-hidden bg-slate-900 text-white">
                {/* Safety Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9811a_1px,transparent_1px),linear-gradient(to_bottom,#10b9811a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Radar Effect */}
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] border border-emerald-500/20 rounded-full -translate-y-1/2 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] border border-emerald-500/10 rounded-full -translate-y-1/2 animate-[spin_5s_linear_infinite_reverse]"></div>

                <div className="container relative z-10 px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/20 px-4 py-1.5 text-sm font-bold text-emerald-400">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Total Road Protection</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Drive with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Zero Worries.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                            Comprehensive coverage for your car and bike with cashless claims at 5000+ garages. 24x7 Roadside Assistance included.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-emerald-900/40 bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={scrollToForm}>
                                Get Quick Quote
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-emerald-900/30 rounded-full"><Zap className="h-4 w-4 text-emerald-400" /></div>
                                <div>
                                    <p className="font-bold text-white">Instant</p>
                                    <p className="text-xs text-slate-500">Policy Issue</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-emerald-900/30 rounded-full"><Wrench className="h-4 w-4 text-emerald-400" /></div>
                                <div>
                                    <p className="font-bold text-white">Cashless</p>
                                    <p className="text-xs text-slate-500">Repairs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Hero Element - 3D Shield */}
                    <div className="relative hidden lg:block h-[500px]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Floating Shield Layer */}
                            <motion.div
                                className="relative w-80 h-96 bg-gradient-to-br from-emerald-500 to-green-700 rounded-[50px] shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center border-4 border-emerald-400/50"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                                <ShieldCheck className="h-40 w-40 text-white drop-shadow-xl" />

                                {/* Orbiting Elements */}
                                <div className="absolute -right-8 top-20 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center gap-1 animate-bounce delay-100">
                                    <Car className="h-6 w-6 text-blue-400" />
                                    <span className="text-[10px] font-bold text-slate-300">CAR</span>
                                </div>
                                <div className="absolute -left-8 bottom-20 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center gap-1 animate-bounce delay-300">
                                    <Bike className="h-6 w-6 text-orange-400" />
                                    <span className="text-[10px] font-bold text-slate-300">BIKE</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Strip */}
            <div className="bg-red-900/10 border-y border-red-900/20 py-4">
                <div className="container px-4 text-center">
                    <p className="text-red-500 font-bold flex items-center justify-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Accidents happen. Be prepared with 24x7 Emergency Roadside Assistance.
                    </p>
                </div>
            </div>

            {/* Main Content Layout with Sticky Sidebar */}
            <div className="container px-4 md:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Content */}
                <div className="space-y-16">
                    <ContentSection
                        title="Road Safety Starts Here"
                        description="Your vehicle is more than just a mode of transport; it's a valuable asset. Our Comprehensive Vehicle Insurance plans offer 360-degree protection against natural calamities (floods, earthquakes), man-made disasters (theft, riots), and third-party liabilities. We understand that accidents can happen anytime, which is why our 24x7 Roadside Assistance is just a call away. With add-ons like Zero Depreciation, Engine Protect, and Return to Invoice, we ensure that your out-of-pocket expenses are minimized during a claim."
                        imageSrc="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                        imageAlt="Car on road"
                    >
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">Cashless</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">At 5000+ Garages</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                                <h4 className="font-bold text-green-700 dark:text-green-300 text-lg">Zero Dep</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Full Claim Value</p>
                            </div>
                        </div>
                    </ContentSection>

                    {/* Accordions */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="text-emerald-600" /> Coverage Details
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Third Party Liability", content: "Mandatory by law. Covers damages to third-party property or person involved in accident." },
                                    { title: "Own Damage Cover", content: "Covers damages to your own vehicle due to accidents, fire, theft, or natural calamities." },
                                    { title: "Personal Accident Cover", content: "Compulsory cover of ₹15 Lakhs for the owner-driver in case of accidental death or disability." },
                                ]}
                            />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <ShieldCheck className="text-green-600" /> Must-Have Add-ons
                            </h3>
                            <SimpleAccordion
                                items={[
                                    { title: "Zero Depreciation", content: "Get full claim amount without deduction for depreciation on parts replaced." },
                                    { title: "24x7 Roadside Assistance", content: "Emergency help for flat tyre, towing, battery jumpstart, and fuel delivery." },
                                    { title: "Engine Protection", content: "Covers repair costs for engine damage due to water ingression or oil leakage (essential for flood-prone areas)." },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Form */}
                <aside className="relative">
                    <div id="lead-form" className="sticky top-24">
                        <Card className="glass-card bg-white/80 dark:bg-slate-900/80 border-emerald-100 dark:border-emerald-900 shadow-2xl overflow-hidden ring-1 ring-emerald-500/10">
                            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
                                <CardTitle className="text-lg">Get Vehicle Quote</CardTitle>
                                <p className="text-emerald-100 text-sm">Save up to 80% on renewal</p>
                            </CardHeader>
                            <CardContent className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Request Received</h3>
                                        <p className="text-slate-600 dark:text-slate-300 mt-2">Agent contacting shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                                            <Input
                                                placeholder="Full Name"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile</label>
                                            <Input
                                                placeholder="10 digit number"
                                                className="bg-slate-50 border-slate-200"
                                                value={formData.mobile}
                                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Vehicle Type</label>
                                                <select
                                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={formData.vehicleType}
                                                    onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Car">Car</option>
                                                    <option value="Bike">Bike</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Reg Number</label>
                                                <Input
                                                    placeholder="e.g. MH12AB1234"
                                                    className="bg-slate-50 border-slate-200"
                                                    value={formData.vehicleNum}
                                                    onChange={e => setFormData({ ...formData, vehicleNum: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-base shadow-lg shadow-emerald-500/20 mt-2">Get Quote</Button>
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
