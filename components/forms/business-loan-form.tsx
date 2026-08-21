"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface BusinessLoanSpecificFields {
    loanAmount: number;
    businessType: string;
    businessNature: string;
    businessTurnover: string;
    yearsInBusiness: string;
    gstRegistered: "Yes" | "No";
    currentBank: string;
}

interface Props {
    data: BusinessLoanSpecificFields;
    onChange: (fields: Partial<BusinessLoanSpecificFields>) => void;
}

export function BusinessLoanInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Business Capital Required <span className="text-rose-600">*</span>
                </label>
                <Input
                    type="number"
                    value={data.loanAmount}
                    onChange={(e) => onChange({ loanAmount: Number(e.target.value) })}
                    required
                    min={200000}
                    step={50000}
                    className="bg-white border-sky-200 h-11 text-sm font-bold text-slate-900 rounded-md"
                />
                <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    <div>Rs. {data.loanAmount.toLocaleString("en-IN")}</div>
                    <div>{formatIndianCurrencyWords(data.loanAmount)}.</div>
                </div>
            </div>

            {/* 2. Business Constitution */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Business Constitution <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.businessType}
                    onChange={(e) => onChange({ businessType: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#00c985]"
                >
                    <option value="Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership / LLP">Partnership / LLP</option>
                    <option value="Private Limited Company">Private Limited Company</option>
                    <option value="Self-Employed Professional">Self-Employed Professional / Doctor</option>
                </select>
            </div>

            {/* 3. Industry / Nature of Business */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Nature of Business <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.businessNature}
                    onChange={(e) => onChange({ businessNature: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#00c985]"
                >
                    <option value="Manufacturing / Industrial">Manufacturing / Industrial</option>
                    <option value="Trading / Wholesale / Retail">Trading / Wholesale / Retail</option>
                    <option value="Services / IT / Consulting">Services / IT / Consulting</option>
                    <option value="Hospitality / Logistics / Healthcare">Hospitality / Logistics / Healthcare</option>
                </select>
            </div>

            {/* 4. Annual Turnover */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Annual Turnover (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 5000000"
                    value={data.businessTurnover}
                    onChange={(e) => onChange({ businessTurnover: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 5. Business Vintage (Years in operation) */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Years in Business <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 4"
                    type="number"
                    value={data.yearsInBusiness}
                    onChange={(e) => onChange({ yearsInBusiness: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 6. GST Registered? */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    GST Registered? <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="biz_gst"
                            checked={data.gstRegistered === "Yes"}
                            onChange={() => onChange({ gstRegistered: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes (Faster Sanctions)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="biz_gst"
                            checked={data.gstRegistered === "No"}
                            onChange={() => onChange({ gstRegistered: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No
                    </label>
                </div>
            </div>
        </div>
    );
}
