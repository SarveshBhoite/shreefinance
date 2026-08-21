"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Step1BasicInfo, LoanCategoryConfig, formatIndianCurrencyWords } from "./loan-form-types";

interface Step1Props {
    config: LoanCategoryConfig;
    data: Step1BasicInfo;
    onChange: (fields: Partial<Step1BasicInfo>) => void;
    onProceed: () => void;
    error?: string;
}

export function LoanFormStep1({ config, data, onChange, onProceed, error }: Step1Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onProceed();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
                        Step 1: Quick Eligibility & Basic Information ({config.name})
                    </span>
                    <span className="text-xs font-bold text-[#00c985] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {config.rate} starting APR
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {/* Loan Amount */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            Loan Amount <span className="text-rose-600">*</span>
                        </label>
                        <Input
                            type="number"
                            value={data.loanAmount}
                            onChange={(e) => onChange({ loanAmount: Number(e.target.value) })}
                            required
                            min={50000}
                            step={10000}
                            className="bg-sky-50/50 border-sky-200 h-11 text-sm font-bold text-slate-900"
                        />
                        <span className="text-[11px] font-bold text-sky-800 block">
                            {formatIndianCurrencyWords(data.loanAmount)}
                        </span>
                    </div>

                    {/* Employment Status */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            Employment Status <span className="text-rose-600">*</span>
                        </label>
                        <div className="flex items-center gap-6 pt-2">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                                <input
                                    type="radio"
                                    name="empStatusStep1"
                                    checked={data.employmentStatus === "Salaried"}
                                    onChange={() => onChange({ employmentStatus: "Salaried" })}
                                    className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                                />
                                Salaried
                            </label>
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                                <input
                                    type="radio"
                                    name="empStatusStep1"
                                    checked={data.employmentStatus === "Self-Employed"}
                                    onChange={() => onChange({ employmentStatus: "Self-Employed" })}
                                    className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                                />
                                Self-Employed
                            </label>
                        </div>
                    </div>

                    {/* City */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            City <span className="text-rose-600">*</span>
                        </label>
                        <select
                            value={data.city}
                            onChange={(e) => onChange({ city: e.target.value })}
                            required
                            className="w-full h-11 bg-white border border-sky-200 rounded-lg px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#00c985]"
                        >
                            <option value="">Please Select</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                            <option value="Delhi / NCR">Delhi / NCR</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Other">Other Major City</option>
                        </select>
                    </div>

                    {/* First Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            First Name <span className="text-rose-600">*</span>
                        </label>
                        <Input
                            placeholder="Enter First Name"
                            value={data.firstName}
                            onChange={(e) => onChange({ firstName: e.target.value })}
                            required
                            className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            Mobile Number <span className="text-rose-600">*</span>
                        </label>
                        <Input
                            placeholder="10-digit mobile number"
                            type="tel"
                            maxLength={10}
                            value={data.mobile}
                            onChange={(e) => onChange({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                            required
                            className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                            E-Mail ID <span className="text-rose-600">*</span>
                        </label>
                        <Input
                            placeholder="name@example.com"
                            type="email"
                            value={data.email}
                            onChange={(e) => onChange({ email: e.target.value })}
                            required
                            className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold text-center">
                    {error}
                </div>
            )}

            <div className="flex justify-end pt-2">
                <Button
                    type="submit"
                    className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold h-12 px-8 rounded-lg shadow-md text-xs uppercase tracking-wider cursor-pointer"
                >
                    Proceed to Complete Application →
                </Button>
            </div>
        </form>
    );
}
