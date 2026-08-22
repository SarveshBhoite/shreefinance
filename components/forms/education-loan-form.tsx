"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface EducationLoanSpecificFields {
    loanAmount: number;
    studyCountry: string;
    courseLevel: string;
    targetUniversity: string;
    courseDurationYears: string;
    coBorrowerRelation: string;
    coBorrowerAnnualIncome: string;
}

interface Props {
    data: EducationLoanSpecificFields;
    onChange: (fields: Partial<EducationLoanSpecificFields>) => void;
}

export function EducationLoanInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Tuition & Living Funds Required <span className="text-rose-600">*</span>
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

            {/* 2. Destination Country */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Country of Study <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.studyCountry}
                    onChange={(e) => onChange({ studyCountry: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="United States (USA)">United States (USA)</option>
                    <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany / Europe">Germany / Europe</option>
                    <option value="Australia / New Zealand">Australia / New Zealand</option>
                    <option value="India (IIT / IIM / Top Universities)">India (IIT / IIM / Top Universities)</option>
                    <option value="Other International">Other International</option>
                </select>
            </div>

            {/* 3. Course Level */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Course Level <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.courseLevel}
                    onChange={(e) => onChange({ courseLevel: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Post-Graduate / Master's / MS">Post-Graduate / Master's / MS</option>
                    <option value="MBA / PGDM">MBA / PGDM</option>
                    <option value="Undergraduate / Bachelor's / B.Tech">Undergraduate / Bachelor's / B.Tech</option>
                    <option value="Medical / MBBS / MD">Medical / MBBS / MD</option>
                    <option value="PhD / Research / Pilot Training">PhD / Research / Pilot Training</option>
                </select>
            </div>

            {/* 4. Target University */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    University / College Name <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. Harvard, Oxford, IIM, Toronto"
                    value={data.targetUniversity}
                    onChange={(e) => onChange({ targetUniversity: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 5. Co-Borrower Relation (Parent / Guardian) */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Co-Borrower Relationship <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.coBorrowerRelation}
                    onChange={(e) => onChange({ coBorrowerRelation: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling / Brother / Sister">Sibling / Brother / Sister</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                </select>
            </div>

            {/* 6. Co-Borrower Annual Income */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Co-Borrower Annual Income (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 1200000"
                    value={data.coBorrowerAnnualIncome}
                    onChange={(e) => onChange({ coBorrowerAnnualIncome: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>
        </div>
    );
}
