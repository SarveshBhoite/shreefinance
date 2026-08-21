"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import {
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    ArrowLeft,
    Check
} from "lucide-react";
import { motion } from "framer-motion";
import {
    LoanCategoryType,
    LOAN_CATEGORIES,
    Step1BasicInfo,
    formatIndianCurrencyWords
} from "./loan-form-types";
import { LoanFormStep1 } from "./loan-form-step1";
import { CommonPersonalDetailsSection, PersonalDetailsFields } from "./common-personal-details-section";

// Import Loan-Specific Inner Forms
import { PersonalLoanInnerForm, PersonalLoanSpecificFields } from "./personal-loan-form";
import { HomeLoanInnerForm, HomeLoanSpecificFields } from "./home-loan-form";
import { CarLoanInnerForm, CarLoanSpecificFields } from "./car-loan-form";
import { BusinessLoanInnerForm, BusinessLoanSpecificFields } from "./business-loan-form";
import { LAPInnerForm, LAPSpecificFields } from "./lap-loan-form";
import { EducationLoanInnerForm, EducationLoanSpecificFields } from "./education-loan-form";
import { LoanDocumentsUploadSection, DocumentUploadState } from "./loan-documents-upload-section";

export interface Deal4LoansDynamicFormProps {
    initialLoanType?: LoanCategoryType;
    showCategorySwitcher?: boolean;
    onSuccessCallback?: () => void;
    titleOverride?: string;
    containerClassName?: string;
}

export function Deal4LoansDynamicForm({
    initialLoanType = "personal",
    showCategorySwitcher = true,
    onSuccessCallback,
    titleOverride,
    containerClassName = ""
}: Deal4LoansDynamicFormProps) {
    const { sendEmail, isSubmitting, resetForm } = useEmailForm();

    const [selectedType, setSelectedType] = useState<LoanCategoryType>(initialLoanType);
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [formError, setFormError] = useState("");
    const [uploadedDocuments, setUploadedDocuments] = useState<DocumentUploadState>({});

    const activeConfig = LOAN_CATEGORIES[selectedType] || LOAN_CATEGORIES.personal;

    // STEP 1: Basic common parameters
    const [basicInfo, setBasicInfo] = useState<Step1BasicInfo>({
        loanAmount: activeConfig.defaultAmount,
        employmentStatus: "Salaried",
        city: "",
        firstName: "",
        mobile: "",
        email: ""
    });

    // STEP 2: Common Personal Demographic details
    const [personalDetails, setPersonalDetails] = useState<PersonalDetailsFields>({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        education: "Graduate",
        mothersName: "",
        currentAddress: "",
        residenceOwnership: "Owned by Self / Spouse",
        workExperience: "3",
        officialEmail: "",
        pincode: "",
        gender: "Male",
        panCard: "",
        hasCreditCard: "Yes",
        authorized: true
    });

    // STEP 2: Loan-Specific tailored fields
    const [personalSpecific, setPersonalSpecific] = useState<PersonalLoanSpecificFields>({
        loanAmount: 500000,
        employmentStatus: "Salaried",
        city: "",
        loanPurpose: "Marriage / Wedding Expenses",
        companyName: "",
        annualIncome: "750000"
    });

    const [homeSpecific, setHomeSpecific] = useState<HomeLoanSpecificFields>({
        loanAmount: 4500000,
        employmentStatus: "Salaried",
        city: "",
        propertyType: "Purchase of Ready-to-Move Flat / Villa",
        propertyValue: "6000000",
        propertyCity: "",
        propertyIdentified: "Yes",
        coApplicant: "Yes",
        netMonthlySalary: "85000",
        runningLoanEMI: "0"
    });

    const [carSpecific, setCarSpecific] = useState<CarLoanSpecificFields>({
        loanAmount: 800000,
        employmentStatus: "Salaried",
        carType: "Brand New Passenger Car / SUV",
        carModel: "",
        carPrice: "1100000",
        existingCarLoan: "No",
        monthlyIncome: "65000"
    });

    const [businessSpecific, setBusinessSpecific] = useState<BusinessLoanSpecificFields>({
        loanAmount: 2000000,
        businessType: "Proprietorship",
        businessNature: "Manufacturing / Industrial",
        businessTurnover: "5000000",
        yearsInBusiness: "4",
        gstRegistered: "Yes",
        currentBank: ""
    });

    const [lapSpecific, setLapSpecific] = useState<LAPSpecificFields>({
        loanAmount: 6000000,
        propertyType: "Residential House / Flat",
        marketValue: "12000000",
        propertyOccupancy: "Self Occupied (Living / Running Business)",
        existingLoanOnProperty: "No",
        annualBusinessOrSalaryIncome: "1800000"
    });

    const [educationSpecific, setEducationSpecific] = useState<EducationLoanSpecificFields>({
        loanAmount: 1500000,
        studyCountry: "United States (USA)",
        courseLevel: "Post-Graduate / Master's / MS",
        targetUniversity: "",
        courseDurationYears: "2",
        coBorrowerRelation: "Father",
        coBorrowerAnnualIncome: "1200000"
    });

    // Update config on initialLoanType change
    useEffect(() => {
        if (initialLoanType && LOAN_CATEGORIES[initialLoanType]) {
            setSelectedType(initialLoanType);
            const cfg = LOAN_CATEGORIES[initialLoanType];
            setBasicInfo((prev) => ({ ...prev, loanAmount: cfg.defaultAmount }));
        }
    }, [initialLoanType]);

    // Handle loan category switcher click
    const handleCategoryChange = (type: LoanCategoryType) => {
        setSelectedType(type);
        const cfg = LOAN_CATEGORIES[type];
        setBasicInfo((prev) => ({ ...prev, loanAmount: cfg.defaultAmount }));
        setFormError("");
    };

    // Step 1 -> Step 2
    const handleStep1Proceed = () => {
        if (!basicInfo.firstName || !basicInfo.mobile || basicInfo.mobile.length < 10 || !basicInfo.city) {
            setFormError("Please enter your First Name, 10-digit Mobile Number, and City.");
            return;
        }
        setFormError("");

        // Propagate step 1 values into common personal details and loan-specific forms
        setPersonalDetails((prev) => ({
            ...prev,
            firstName: basicInfo.firstName,
            mobile: basicInfo.mobile,
            email: basicInfo.email
        }));

        setPersonalSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount, employmentStatus: basicInfo.employmentStatus, city: basicInfo.city }));
        setHomeSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount, employmentStatus: basicInfo.employmentStatus, city: basicInfo.city, propertyCity: basicInfo.city }));
        setCarSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount, employmentStatus: basicInfo.employmentStatus }));
        setBusinessSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount }));
        setLapSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount }));
        setEducationSpecific((prev) => ({ ...prev, loanAmount: basicInfo.loanAmount }));

        setStep(2);
    };

    // Step 2 Submission (All specific loan parameters sent to backend)
    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!personalDetails.authorized) {
            setFormError("Please agree to the authorization terms to proceed.");
            return;
        }

        let loanSpecificData: Record<string, any> = {};
        let currentLoanAmount = basicInfo.loanAmount;

        if (selectedType === "personal") {
            loanSpecificData = personalSpecific;
            currentLoanAmount = personalSpecific.loanAmount;
        } else if (selectedType === "home") {
            loanSpecificData = homeSpecific;
            currentLoanAmount = homeSpecific.loanAmount;
        } else if (selectedType === "car") {
            loanSpecificData = carSpecific;
            currentLoanAmount = carSpecific.loanAmount;
        } else if (selectedType === "business") {
            loanSpecificData = businessSpecific;
            currentLoanAmount = businessSpecific.loanAmount;
        } else if (selectedType === "lap") {
            loanSpecificData = lapSpecific;
            currentLoanAmount = lapSpecific.loanAmount;
        } else if (selectedType === "education") {
            loanSpecificData = educationSpecific;
            currentLoanAmount = educationSpecific.loanAmount;
        }

        const uploadedDocsSummary = Object.entries(uploadedDocuments)
            .map(([docName, info]) => `${docName}: ${info.fileName} (${info.fileSize})`)
            .join(" | ");

        const payload = {
            type: `${activeConfig.name} Application (Deal4Loans Standard)`,
            applicationHeader: "Shree Finance Direct Bank Facility Application",
            loanCategory: activeConfig.name,
            loanAmount: `Rs. ${currentLoanAmount.toLocaleString("en-IN")} (${formatIndianCurrencyWords(currentLoanAmount)})`,
            benchmarkInterestRate: `${activeConfig.rate} p.a.`,
            applicantName: `${personalDetails.firstName} ${personalDetails.lastName}`.trim(),
            ...loanSpecificData,
            ...personalDetails,
            uploadedDocuments: uploadedDocsSummary || "No documents uploaded during online step (To be collected by Underwriter)",
            source: `Shree Finance Unified Hub (${activeConfig.name})`
        };

        await sendEmail(payload);
        setStep(3);
        if (onSuccessCallback) onSuccessCallback();
    };

    const handleReset = () => {
        resetForm();
        setStep(1);
        setBasicInfo({
            loanAmount: activeConfig.defaultAmount,
            employmentStatus: "Salaried",
            city: "",
            firstName: "",
            mobile: "",
            email: ""
        });
    };

    return (
        <div className={`w-full bg-[#f4f9fd] text-slate-900 rounded-3xl border border-sky-200 shadow-2xl p-6 sm:p-10 font-sans relative overflow-hidden ${containerClassName}`}>
            {/* Top Title Bar matching Deal4Loans header */}
            <div className="border-b border-sky-200 pb-5 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-emerald-300">
                            <Sparkles className="h-3 w-3 text-emerald-600" /> Shree Finance Direct Bank Facility
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                            {titleOverride || activeConfig.headline}
                        </h2>
                    </div>
                    <div className="text-xs text-slate-500 font-semibold italic shrink-0">
                        All fields marked with <span className="text-rose-600 font-black">*</span> fields are mandatory
                    </div>
                </div>
            </div>

            {/* Category Switcher Tabs (when enabled) */}
            {showCategorySwitcher && (
                <div className="mb-6 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 uppercase">
                        <span>Select Loan Type</span>
                        <span className="text-emerald-700 font-black">{activeConfig.rate} p.a. starting</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-1.5 bg-sky-100/70 rounded-2xl border border-sky-200">
                        {(Object.keys(LOAN_CATEGORIES) as LoanCategoryType[]).map((key) => {
                            const cfg = LOAN_CATEGORIES[key];
                            const Icon = cfg.icon;
                            const isSelected = selectedType === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleCategoryChange(key)}
                                    className={`p-2.5 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer ${
                                        isSelected
                                            ? "bg-[#0284c7] text-white shadow-md scale-102"
                                            : "text-slate-700 hover:bg-white hover:text-slate-900"
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="text-[11px] leading-tight text-center">{cfg.name.replace(" Loan", "")}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* STEP 1: Basic Parameters */}
            {step === 1 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <LoanFormStep1
                        config={activeConfig}
                        data={basicInfo}
                        onChange={(fields) => setBasicInfo((prev) => ({ ...prev, ...fields }))}
                        onProceed={handleStep1Proceed}
                        error={formError}
                    />
                </motion.div>
            )}

            {/* STEP 2: Tailored Inner Form per Loan Type + Common Personal Details */}
            {step === 2 && (
                <motion.form
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleStep2Submit}
                    className="space-y-8"
                >
                    {/* Render Specific Inner Form according to the selected loan type */}
                    {selectedType === "personal" && (
                        <PersonalLoanInnerForm
                            data={personalSpecific}
                            onChange={(fields) => setPersonalSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {selectedType === "home" && (
                        <HomeLoanInnerForm
                            data={homeSpecific}
                            onChange={(fields) => setHomeSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {selectedType === "car" && (
                        <CarLoanInnerForm
                            data={carSpecific}
                            onChange={(fields) => setCarSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {selectedType === "business" && (
                        <BusinessLoanInnerForm
                            data={businessSpecific}
                            onChange={(fields) => setBusinessSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {selectedType === "lap" && (
                        <LAPInnerForm
                            data={lapSpecific}
                            onChange={(fields) => setLapSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {selectedType === "education" && (
                        <EducationLoanInnerForm
                            data={educationSpecific}
                            onChange={(fields) => setEducationSpecific((prev) => ({ ...prev, ...fields }))}
                        />
                    )}

                    {/* Common Personal Details Section */}
                    <CommonPersonalDetailsSection
                        data={personalDetails}
                        onChange={(fields) => setPersonalDetails((prev) => ({ ...prev, ...fields }))}
                    />

                    {/* Step 2 Document Upload Section */}
                    {activeConfig.requiredDocuments && activeConfig.requiredDocuments.length > 0 && (
                        <LoanDocumentsUploadSection
                            loanName={activeConfig.name}
                            documents={activeConfig.requiredDocuments}
                            uploadedDocs={uploadedDocuments}
                            onDocumentChange={setUploadedDocuments}
                        />
                    )}

                    {formError && (
                        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold text-center">
                            {formError}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-sky-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="w-full sm:w-auto border-sky-300 text-slate-700 font-bold h-12 px-6 rounded-md text-xs"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Modify Basic Information
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold h-12 px-10 rounded-md shadow-md text-sm uppercase tracking-wider cursor-pointer"
                        >
                            {isSubmitting ? "Processing Application..." : "GET QUOTE"}
                        </Button>
                    </div>
                </motion.form>
            )}

            {/* STEP 3: Sanction Acknowledgement Receipt */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-sky-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
                >
                    <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase mb-1">
                                <Check className="h-3 w-3 text-emerald-600" /> Pre-Approval In Progress
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{activeConfig.name} Application Acknowledgement</h3>
                            <p className="text-xs text-slate-500 font-medium">Shree Finance Direct Bank Facility • Reference #SF-BANK-{Math.floor(100000 + Math.random() * 900000)}</p>
                        </div>
                        <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black shrink-0">
                            <CheckCircle2 className="h-7 w-7" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-sky-50/60 rounded-xl border border-sky-100 text-xs text-slate-800">
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Applicant Name</span>
                            <span className="font-bold text-slate-900">{personalDetails.firstName} {personalDetails.lastName}</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Loan Product</span>
                            <span className="font-bold text-slate-900">{activeConfig.name}</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">City & Pincode</span>
                            <span className="font-bold">{basicInfo.city} {personalDetails.pincode ? `(${personalDetails.pincode})` : ""}</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Benchmark Rate</span>
                            <span className="font-black text-emerald-600">{activeConfig.rate} p.a.</span>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Status</span>
                            <span className="font-bold text-sky-700">Dispatched to 40+ Partner Banks</span>
                        </div>
                    </div>

                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900 font-bold">
                        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span>Your application has been successfully routed. A senior loan officer will call you within 15 minutes to review bank sanction quotes.</span>
                    </div>

                    <div className="pt-2 text-center">
                        <Button
                            onClick={handleReset}
                            className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-8 h-11 text-xs uppercase tracking-wider rounded-md"
                        >
                            Submit Another Quote
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
