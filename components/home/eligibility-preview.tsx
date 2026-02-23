import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield } from "lucide-react";

export function EligibilityPreview() {
    return (
        <section className="w-full py-16 bg-slate-900 text-white relative overflow-hidden">
            {/* Abstract Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                    Check Your Eligibility in 60 Seconds
                </h2>
                <p className="text-slate-300 md:text-lg max-w-2xl mx-auto mb-10">
                    Know exactly how much you can borrow across all our partners.
                    Checking your eligibility has <strong>no impact</strong> on your credit score.
                </p>

                <div className="flex flex-wrap justify-center gap-8 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full">
                            <Clock className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold">Instant Check</div>
                            <div className="text-xs text-slate-400">Takes &lt; 1 min</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full">
                            <Shield className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold">Safe & Secure</div>
                            <div className="text-xs text-slate-400">256-bit Encryption</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-full">
                            <CheckCircle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="text-left">
                            <div className="font-semibold">No Spam</div>
                            <div className="text-xs text-slate-400">Privacy Guaranteed</div>
                        </div>
                    </div>
                </div>

                <Button size="lg" variant="premium" className="h-12 px-8 text-lg shadow-blue-500/50 shadow-lg">
                    Check My Eligibility Now
                </Button>
            </div>
        </section>
    )
}
