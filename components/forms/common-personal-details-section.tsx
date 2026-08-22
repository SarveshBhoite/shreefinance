"use client";

import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export interface PersonalDetailsFields {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    dob: string;
    education: string;
    mothersName: string;
    currentAddress: string;
    residenceOwnership: string;
    workExperience: string;
    officialEmail: string;
    pincode: string;
    gender: string;
    panCard: string;
    hasCreditCard: "Yes" | "No";
    authorized: boolean;
}

interface CommonPersonalFieldsProps {
    data: PersonalDetailsFields;
    onChange: (fields: Partial<PersonalDetailsFields>) => void;
    privacyNote?: string;
}

export function CommonPersonalDetailsSection({
    data,
    onChange,
    privacyNote = "Your Information is secure with us and will not be shared without your consent"
}: CommonPersonalFieldsProps) {
    return (
        <div className="space-y-4 pt-4 border-t border-sky-200">
            <div>
                <h3 className="text-lg font-bold text-slate-900">Personal Details</h3>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                    <Lock className="h-3.5 w-3.5 text-slate-600" />
                    {privacyNote}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* First Name */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        First Name <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        value={data.firstName}
                        onChange={(e) => onChange({ firstName: e.target.value })}
                        required
                        placeholder="First Name"
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Last Name <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        value={data.lastName}
                        onChange={(e) => onChange({ lastName: e.target.value })}
                        required
                        placeholder="Last Name"
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                <div className="hidden md:block"></div>

                {/* E-Mail ID */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        E-Mail ID <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                        required
                        placeholder="name@example.com"
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Mobile Number <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        type="tel"
                        maxLength={10}
                        value={data.mobile}
                        onChange={(e) => onChange({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        required
                        placeholder="10-digit mobile number"
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* DOB */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        DOB <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        type="date"
                        value={data.dob}
                        onChange={(e) => onChange({ dob: e.target.value })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Education Qualification */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Education Qualification <span className="text-rose-600">*</span>
                    </label>
                    <select
                        value={data.education}
                        onChange={(e) => onChange({ education: e.target.value })}
                        required
                        className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                    >
                        <option value="">Please Select</option>
                        <option value="Undergraduate">Undergraduate / High School</option>
                        <option value="Graduate">Graduate (BA, B.Com, B.Sc, B.Tech, etc.)</option>
                        <option value="Post-Graduate">Post Graduate (MBA, M.Tech, MS, etc.)</option>
                        <option value="Professional">Professional (CA, CS, Doctor, Lawyer)</option>
                    </select>
                </div>

                {/* Mother's Name */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Mother's Name <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="Mother's Full Name"
                        value={data.mothersName}
                        onChange={(e) => onChange({ mothersName: e.target.value })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Current Address */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Current Address <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="House / Flat No, Street, Locality"
                        value={data.currentAddress}
                        onChange={(e) => onChange({ currentAddress: e.target.value })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Residence Ownership */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Residence Ownership <span className="text-rose-600">*</span>
                    </label>
                    <select
                        value={data.residenceOwnership}
                        onChange={(e) => onChange({ residenceOwnership: e.target.value })}
                        required
                        className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                    >
                        <option value="">Please Select</option>
                        <option value="Owned by Self / Spouse">Owned by Self / Spouse</option>
                        <option value="Owned by Parents / Family">Owned by Parents / Family</option>
                        <option value="Rented with Family">Rented with Family</option>
                        <option value="Rented - Bachelor / Staying Alone">Rented - Bachelor / Staying Alone</option>
                        <option value="Company Provided Accommodation">Company Provided Accommodation</option>
                    </select>
                </div>

                {/* Total Work Experience (In Year/s) */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Total Work Experience (In Year/s) <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="e.g. 3"
                        type="number"
                        value={data.workExperience}
                        onChange={(e) => onChange({ workExperience: e.target.value })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Official Email ID */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Official Email ID <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="name@company.com"
                        type="email"
                        value={data.officialEmail}
                        onChange={(e) => onChange({ officialEmail: e.target.value })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Current Pincode */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Current Pincode <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="6-digit Pincode"
                        maxLength={6}
                        value={data.pincode}
                        onChange={(e) => onChange({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 rounded-md"
                    />
                </div>

                {/* Gender */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        Gender <span className="text-rose-600">*</span>
                    </label>
                    <select
                        value={data.gender}
                        onChange={(e) => onChange({ gender: e.target.value })}
                        required
                        className="w-full h-11 bg-white border border-sky-200 rounded-md px-3 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#0284c7]"
                    >
                        <option value="">Please Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Third Gender">Third Gender</option>
                    </select>
                </div>

                {/* PAN Card Number */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                        PAN Card Number <span className="text-rose-600">*</span>
                    </label>
                    <Input
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        value={data.panCard}
                        onChange={(e) => onChange({ panCard: e.target.value.toUpperCase() })}
                        required
                        className="bg-white border-sky-200 h-11 text-xs font-bold text-slate-900 uppercase font-mono rounded-md tracking-wider"
                    />
                </div>
            </div>

            {/* Any Credit Card Radio */}
            <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                    Any Credit Card <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="creditCardOptStep2"
                            checked={data.hasCreditCard === "Yes"}
                            onChange={() => onChange({ hasCreditCard: "Yes" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                        <input
                            type="radio"
                            name="creditCardOptStep2"
                            checked={data.hasCreditCard === "No"}
                            onChange={() => onChange({ hasCreditCard: "No" })}
                            className="h-4 w-4 text-sky-600 accent-[#0284c7]"
                        />
                        No
                    </label>
                </div>
            </div>

            {/* Authorization Checkbox */}
            <div className="pt-4 flex items-start gap-2.5">
                <input
                    type="checkbox"
                    id="termsAuthStep2"
                    checked={data.authorized}
                    onChange={(e) => onChange({ authorized: e.target.checked })}
                    className="h-4 w-4 mt-0.5 rounded border-sky-300 text-sky-600 accent-[#0284c7] cursor-pointer"
                />
                <label htmlFor="termsAuthStep2" className="text-xs text-slate-600 font-medium leading-relaxed cursor-pointer">
                    I authorize Shree Finance, Deal4loans partner network & its partnering banks to contact me to explain the product & I Agree to Privacy policy and Terms and Conditions.
                </label>
            </div>
        </div>
    );
}
