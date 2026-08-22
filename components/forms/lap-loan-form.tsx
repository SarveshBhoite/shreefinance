"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface LAPSpecificFields {
    loanAmount: number;
    propertyType: string;
    marketValue: string;
    propertyOccupancy: string;
    existingLoanOnProperty: "Yes" | "No";
    annualBusinessOrSalaryIncome: string;
}

interface Props {
    data: LAPSpecificFields;
    onChange: (fields: Partial<LAPSpecificFields>) => void;
}

export function LAPInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Mortgage Loan Amount Required <span className="text-rose-600">*</span>
                </label>
                <Input
                    type="number"
                    value={data.loanAmount}
                    onChange={(e) => onChange({ loanAmount: Number(e.target.value) })}
                    required
                    min={500000}
                    step={100000}
                    className="bg-white border-sky-200 h-11 text-sm font-bold text-slate-900 rounded-md"
                />
                <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    <div>Rs. {data.loanAmount.toLocaleString("en-IN")}</div>
                    <div>{formatIndianCurrencyWords(data.loanAmount)}.</div>
                </div>
            </div>

            {/* 2. Mortgaged Property Type */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Property Type to Pledge <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.propertyType}
                    onChange={(e) => onChange({ propertyType: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Residential House / Flat">Residential House / Flat</option>
                    <option value="Commercial Shop / Office Space">Commercial Shop / Office Space</option>
                    <option value="Industrial Plot / Warehouse">Industrial Plot / Warehouse</option>
                    <option value="Open Residential Plot / Land">Open Residential Plot / Land</option>
                </select>
            </div>

            {/* 3. Estimated Market Value */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Current Market Value (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 15000000"
                    value={data.marketValue}
                    onChange={(e) => onChange({ marketValue: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 4. Occupancy Status */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Occupancy Status <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.propertyOccupancy}
                    onChange={(e) => onChange({ propertyOccupancy: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Self Occupied (Living / Running Business)">Self Occupied (Living / Running Business)</option>
                    <option value="Rented Out (Generating Rental Income)">Rented Out (Generating Rental Income)</option>
                    <option value="Vacant / Under Construction">Vacant / Under Construction</option>
                </select>
            </div>

            {/* 5. Existing Mortgage / Loan on Property */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Existing Loan on this Property? <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="lap_existingLoan"
                            checked={data.existingLoanOnProperty === "Yes"}
                            onChange={() => onChange({ existingLoanOnProperty: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes (Balance Transfer + Top-Up)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="lap_existingLoan"
                            checked={data.existingLoanOnProperty === "No"}
                            onChange={() => onChange({ existingLoanOnProperty: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No (Clear Title)
                    </label>
                </div>
            </div>

            {/* 6. Annual Gross Income */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Annual Gross Income (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 1800000"
                    value={data.annualBusinessOrSalaryIncome}
                    onChange={(e) => onChange({ annualBusinessOrSalaryIncome: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>
        </div>
    );
}
