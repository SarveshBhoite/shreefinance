"use client";

import { Input } from "@/components/ui/input";
import { formatIndianCurrencyWords } from "./loan-form-types";

export interface CarLoanSpecificFields {
    loanAmount: number;
    employmentStatus: "Salaried" | "Self-Employed";
    carType: string;
    carModel: string;
    carPrice: string;
    existingCarLoan: "Yes" | "No";
    monthlyIncome: string;
}

interface Props {
    data: CarLoanSpecificFields;
    onChange: (fields: Partial<CarLoanSpecificFields>) => void;
}

export function CarLoanInnerForm({ data, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Loan Amount */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Car Loan Amount <span className="text-rose-600">*</span>
                </label>
                <Input
                    type="number"
                    value={data.loanAmount}
                    onChange={(e) => onChange({ loanAmount: Number(e.target.value) })}
                    required
                    min={100000}
                    step={25000}
                    className="bg-white border-sky-200 h-11 text-sm font-bold text-slate-900 rounded-md"
                />
                <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    <div>Rs. {data.loanAmount.toLocaleString("en-IN")}</div>
                    <div>{formatIndianCurrencyWords(data.loanAmount)}.</div>
                </div>
            </div>

            {/* 2. Car Type */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Car Category / Condition <span className="text-rose-600">*</span>
                </label>
                <select
                    value={data.carType}
                    onChange={(e) => onChange({ carType: e.target.value })}
                    required
                    className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                >
                    <option value="Brand New Passenger Car / SUV">Brand New Passenger Car / SUV</option>
                    <option value="Certified Pre-Owned / Used Car">Certified Pre-Owned / Used Car</option>
                    <option value="Electric Vehicle (EV) Special Offer">Electric Vehicle (EV) Special Offer</option>
                    <option value="Commercial Vehicle / Taxi">Commercial Vehicle / Taxi</option>
                </select>
            </div>

            {/* 3. Expected Car Model & Brand */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Make & Model <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. Hyundai Creta, Tata Nexon EV, Swift"
                    value={data.carModel}
                    onChange={(e) => onChange({ carModel: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 4. On-Road Vehicle Price */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Estimated On-Road Price (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 1250000"
                    value={data.carPrice}
                    onChange={(e) => onChange({ carPrice: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 5. Net Monthly Income */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Net Monthly Income (₹) <span className="text-rose-600">*</span>
                </label>
                <Input
                    placeholder="e.g. 65000"
                    value={data.monthlyIncome}
                    onChange={(e) => onChange({ monthlyIncome: e.target.value })}
                    required
                    className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                />
            </div>

            {/* 6. Any Existing Car Loan */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                    Existing Auto Loan? <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6 pt-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="car_existingLoan"
                            checked={data.existingCarLoan === "Yes"}
                            onChange={() => onChange({ existingCarLoan: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="car_existingLoan"
                            checked={data.existingCarLoan === "No"}
                            onChange={() => onChange({ existingCarLoan: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No
                    </label>
                </div>
            </div>
        </div>
    );
}
