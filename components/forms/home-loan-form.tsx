"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface HomeLoanSpecificFields {
    loanAmount: number;
    employmentStatus: "Salaried" | "Self-Employed";
    city: string;
    propertyType: string;
    propertyValue: string;
    propertyCity: string;
    propertyIdentified: "Yes" | "No";
    coApplicant: "Yes" | "No";
    netMonthlySalary: string;
    runningLoanEMI: string;
}

interface Props {
    data: HomeLoanSpecificFields;
    onChange: (fields: Partial<HomeLoanSpecificFields>) => void;
}

export function HomeLoanInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Home Loan Amount Required <span className="text-rose-600">*</span>
                </label>
                <Input
                    type="number"
                    value={data.loanAmount}
                    onChange={(e) => onChange({ loanAmount: Number(e.target.value) })}
                    required
                    min={300000}
                    step={50000}
                    className="bg-white border-sky-200 h-11 text-sm font-bold text-slate-900 rounded-md"
                />
                <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    <div>Rs. {data.loanAmount.toLocaleString("en-IN")}</div>
                    <div>{formatIndianCurrencyWords(data.loanAmount)}.</div>
                </div>
            </div>

            {/* 2. Employment Type */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Applicant Employment <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_empStatus"
                            checked={data.employmentStatus === "Salaried"}
                            onChange={() => onChange({ employmentStatus: "Salaried" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Salaried
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_empStatus"
                            checked={data.employmentStatus === "Self-Employed"}
                            onChange={() => onChange({ employmentStatus: "Self-Employed" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Self-Employed
                    </label>
                </div>
            </div>

            {/* 3. Property Purpose / Type */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Property Purpose / Type <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.propertyType}
                    onChange={(e) => onChange({ propertyType: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#00c985]"
                >
                    <option value="Purchase of Ready-to-Move Flat / Villa">Purchase of Ready-to-Move Flat / Villa</option>
                    <option value="Under-Construction Residential Apartment">Under-Construction Residential Apartment</option>
                    <option value="Plot Purchase + House Construction">Plot Purchase + House Construction</option>
                    <option value="Home Loan Balance Transfer + Top-Up">Home Loan Balance Transfer + Top-Up</option>
                    <option value="Home Renovation / Extension Loan">Home Renovation / Extension Loan</option>
                </select>
            </div>

            {/* 4. Property Value */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Property Value <span className="text-rose-600">*</span>
                </label>
                <Input
                    type="number"
                    placeholder="e.g. 6000000"
                    value={data.propertyValue}
                    onChange={(e) => onChange({ propertyValue: e.target.value })}
                    required
                    min={100000}
                    step={50000}
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
                {data.propertyValue && Number(data.propertyValue) > 0 && (
                    <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                        {formatIndianCurrencyWords(Number(data.propertyValue))}
                    </div>
                )}
            </div>

            {/* 5. Property City */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Property Location / City <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. Mumbai, Pune, Thane"
                    value={data.propertyCity}
                    onChange={(e) => onChange({ propertyCity: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 6. Net Monthly Salary */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Net Monthly Income (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 85000"
                    value={data.netMonthlySalary}
                    onChange={(e) => onChange({ netMonthlySalary: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 7. Monthly EMI for all running loans */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Monthly EMI for all running loans (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 0 or 15000"
                    value={data.runningLoanEMI}
                    onChange={(e) => onChange({ runningLoanEMI: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 8. Property Identified? */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Have you identified the property? <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_propIdentified"
                            checked={data.propertyIdentified === "Yes"}
                            onChange={() => onChange({ propertyIdentified: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_propIdentified"
                            checked={data.propertyIdentified === "No"}
                            onChange={() => onChange({ propertyIdentified: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No (Pre-Sanction Search)
                    </label>
                </div>
            </div>

            {/* 9. Co-Applicant Available? */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Add Co-Applicant / Spouse? <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_coApp"
                            checked={data.coApplicant === "Yes"}
                            onChange={() => onChange({ coApplicant: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes (Increases Eligibility)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="hl_coApp"
                            checked={data.coApplicant === "No"}
                            onChange={() => onChange({ coApplicant: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No
                    </label>
                </div>
            </div>
        </div>
    );
}
