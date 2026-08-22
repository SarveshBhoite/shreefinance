"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface PersonalLoanSpecificFields {
    loanAmount: number;
    employmentStatus: "Salaried" | "Self-Employed";
    city: string;
    loanPurpose: string;
    companyName: string;
    annualIncome: string;
}

interface Props {
    data: PersonalLoanSpecificFields;
    onChange: (fields: Partial<PersonalLoanSpecificFields>) => void;
}

export function PersonalLoanInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
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
                    className="bg-white border-sky-200 h-11 text-sm font-bold text-slate-900 rounded-md"
                />
                <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    <div>Rs. {data.loanAmount.toLocaleString("en-IN")}</div>
                    <div>{formatIndianCurrencyWords(data.loanAmount)}.</div>
                </div>
            </div>

            {/* 2. Employment Status */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Employment Status <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="pl_empStatus"
                            checked={data.employmentStatus === "Salaried"}
                            onChange={() => onChange({ employmentStatus: "Salaried" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Salaried
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="pl_empStatus"
                            checked={data.employmentStatus === "Self-Employed"}
                            onChange={() => onChange({ employmentStatus: "Self-Employed" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Self-Employed
                    </label>
                </div>
            </div>

            {/* 3. City */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    City <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.city}
                    onChange={(e) => onChange({ city: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
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
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* 4. Loan Purpose */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Loan Purpose <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.loanPurpose}
                    onChange={(e) => onChange({ loanPurpose: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Marriage / Wedding Expenses">Marriage / Family Wedding Expenses</option>
                    <option value="Medical Emergency / Hospitalization">Medical Emergency / Hospitalization</option>
                    <option value="Debt Consolidation / Credit Card Payoff">Debt Consolidation & Credit Card Payoff</option>
                    <option value="Home Renovation / Interior">Home Renovation & Interior</option>
                    <option value="Higher Education / Studies">Higher Education / Studies</option>
                    <option value="Travel & Vacation">Travel & Vacation</option>
                    <option value="General Personal Financing">General Personal Financing</option>
                </select>
            </div>

            {/* 5. Company Name */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Company Name <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. TCS, Infosys, Wipro, Self Business"
                    value={data.companyName}
                    onChange={(e) => onChange({ companyName: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 6. Annual Income */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Annual Income <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 750000"
                    value={data.annualIncome}
                    onChange={(e) => onChange({ annualIncome: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>
        </div>
    );
}
