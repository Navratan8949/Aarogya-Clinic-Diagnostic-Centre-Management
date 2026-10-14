/**
 * AarogyaDesk - Initial Mock & Demonstration Data
 * Realistic Indian Clinic & Diagnostic Centre Operational Data
 * All records are fictional demonstration values.
 */

export const INITIAL_FACILITY = {
  name: "Aarogya Multispeciality Clinic & Diagnostics",
  tagline: "Comprehensive Outpatient Care & Advanced Pathology Laboratory",
  regNo: "RJ/JPR/CLINIC/2023/8842",
  gstin: "08AABCA1234F1Z8",
  nablAccreditation: "NABL/MC-2491 (Demonstration Scope)",
  address: "Plot 42-45, Tonk Road, Near SMS Hospital Circle, Jaipur, Rajasthan 302015",
  phone: "+91 141 278 4500",
  emergencyContact: "+91 141 278 4599",
  email: "care@aarogyadesk-demo.in",
  website: "www.aarogyadesk-demo.in",
  workingHours: "Monday - Saturday: 7:00 AM - 9:00 PM | Sunday: 8:00 AM - 2:00 PM",
  branches: [
    { id: "BR-01", name: "Tonk Road Main Branch (OPD + Lab)", city: "Jaipur", code: "JPR-CENTRAL" },
    { id: "BR-02", name: "Vaishali Nagar Collection Centre", city: "Jaipur", code: "JPR-WEST" },
    { id: "BR-03", name: "Mansarovar Satellite Clinic", city: "Jaipur", code: "JPR-SOUTH" }
  ]
};

export const INITIAL_ROLES = [
  {
    id: "super_admin",
    name: "Super Admin",
    user: "Dr. Arvind Singhal (Medical Director)",
    description: "Unrestricted access across all clinical, laboratory, financial, and administrative operations",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    modules: ["all"]
  },
  {
    id: "clinic_admin",
    name: "Clinic Administrator",
    user: "Sunita Yadav",
    description: "Manages clinic appointments, patient flow, doctor schedules, staff, and management reports",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    modules: ["dashboard", "patients", "appointments", "queue", "doctors", "staff", "reports", "settings"]
  },
  {
    id: "receptionist",
    name: "Receptionist / Front Desk",
    user: "Priya Gupta",
    description: "Patient registration, appointment scheduling, token assignment, check-in, and billing counter",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    modules: ["dashboard", "patients", "appointments", "queue", "billing", "followups"]
  },
  {
    id: "doctor",
    name: "Consultant Doctor",
    user: "Dr. Ananya Sharma (General Physician)",
    description: "OPD consultation queue, patient vitals, diagnosis, e-prescriptions, lab requisitions, follow-ups",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    modules: ["dashboard", "queue", "consultations", "patients", "lab-orders", "prescriptions", "followups"]
  },
  {
    id: "lab_technician",
    name: "Lab Technician",
    user: "Rahul Jain",
    description: "Sample barcode collection, processing worklist, specimen tracking, and diagnostic result entry",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    modules: ["dashboard", "laboratory", "samples", "worklist", "inventory"]
  },
  {
    id: "lab_manager",
    name: "Laboratory Manager",
    user: "Kavita Sharma",
    description: "Laboratory operations, reagent inventory, quality control, turnaround times, and sample rejection oversight",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    modules: ["dashboard", "laboratory", "samples", "worklist", "reports", "inventory", "test-catalogue"]
  },
  {
    id: "pathologist",
    name: "Pathologist (Authorizer)",
    user: "Dr. Rajesh Khandelwal, MD Path",
    description: "Clinical verification of lab results, critical value authorization, report signing, and release to patient",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    modules: ["dashboard", "laboratory", "results", "review", "reports", "worklist"]
  },
  {
    id: "accountant",
    name: "Accountant / Cashier",
    user: "Amit Verma",
    description: "Invoicing, partial payments, UPI/cash reconciliations, day-end cash register, expenses, and GST reports",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    modules: ["dashboard", "billing", "payments", "expenses", "finance", "reports"]
  },
  {
    id: "inventory_manager",
    name: "Inventory Manager",
    user: "Dinesh Meena",
    description: "Medical consumables, lab reagents, stock receipts, batch expiry tracking, and supplier purchase orders",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    modules: ["dashboard", "inventory", "suppliers", "expenses", "reports"]
  },
  {
    id: "patient_portal",
    name: "Patient Portal Demo User",
    user: "Ramesh Kumar (Fictional Patient)",
    description: "Self-service demonstration: view own appointments, verified lab reports, active prescriptions, and payment receipts",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    modules: ["portal"]
  }
];

export const INITIAL_DOCTORS = [
  {
    id: "DOC-01",
    name: "Dr. Ananya Sharma",
    specialty: "General Physician & Diabetologist",
    qualification: "MBBS, MD (Medicine)",
    experience: "12 years",
    regNo: "RMC-38491",
    department: "Internal Medicine",
    consultationFee: 600,
    followupFee: 300,
    followupDays: 7,
    roomNo: "OPD Room 102",
    workingHours: "09:00 AM - 02:00 PM, 05:00 PM - 08:00 PM",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    slotDurationMinutes: 15,
    branchId: "BR-01",
    status: "Active",
    phone: "+91 98290 12345",
    email: "dr.ananya@aarogyadesk-demo.in"
  },
  {
    id: "DOC-02",
    name: "Dr. Rohit Mehta",
    specialty: "Orthopedic & Joint Consultant",
    qualification: "MBBS, MS (Ortho), DNB",
    experience: "16 years",
    regNo: "RMC-29402",
    department: "Orthopedics",
    consultationFee: 800,
    followupFee: 400,
    followupDays: 10,
    roomNo: "OPD Room 104",
    workingHours: "10:00 AM - 01:30 PM, 06:00 PM - 08:30 PM",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    slotDurationMinutes: 20,
    branchId: "BR-01",
    status: "Active",
    phone: "+91 98290 23456",
    email: "dr.rohit@aarogyadesk-demo.in"
  },
  {
    id: "DOC-03",
    name: "Dr. Neha Verma",
    specialty: "Consultant Pediatrician",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "9 years",
    regNo: "RMC-44120",
    department: "Pediatrics",
    consultationFee: 500,
    followupFee: 250,
    followupDays: 5,
    roomNo: "OPD Room 106",
    workingHours: "09:30 AM - 01:00 PM, 04:30 PM - 07:30 PM",
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    slotDurationMinutes: 15,
    branchId: "BR-01",
    status: "Active",
    phone: "+91 98290 34567",
    email: "dr.neha@aarogyadesk-demo.in"
  },
  {
    id: "DOC-04",
    name: "Dr. Arjun Singh",
    specialty: "Consultant Dermatologist & Cosmetologist",
    qualification: "MBBS, DVD, MD (Dermatology)",
    experience: "11 years",
    regNo: "RMC-36112",
    department: "Dermatology",
    consultationFee: 700,
    followupFee: 350,
    followupDays: 7,
    roomNo: "OPD Room 108",
    workingHours: "11:00 AM - 03:00 PM",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    slotDurationMinutes: 15,
    branchId: "BR-01",
    status: "Active",
    phone: "+91 98290 45678",
    email: "dr.arjun@aarogyadesk-demo.in"
  }
];

export const INITIAL_PATIENTS = [
  {
    id: "PAT-1001",
    name: "Ramesh Kumar",
    age: 48,
    dob: "1978-04-12",
    gender: "Male",
    phone: "+91 94140 55120",
    email: "ramesh.k@example-demo.in",
    address: "B-22, Vaishali Nagar, Jaipur",
    bloodGroup: "B+",
    emergencyContact: "Sunita Kumar (Wife) - +91 94140 55121",
    allergies: "Penicillin, Sulfa drugs",
    medicalHistory: "Type 2 Diabetes Mellitus (5 years), Mild Hypertension",
    registrationDate: "2026-09-14",
    abhaId: "91-4421-8890-1234 (Demo Unverified)",
    status: "Active",
    totalVisits: 4,
    outstandingBalance: 350
  },
  {
    id: "PAT-1002",
    name: "Priya Sharma",
    age: 32,
    dob: "1994-08-25",
    gender: "Female",
    phone: "+91 98291 88412",
    email: "priya.sharma@example-demo.in",
    address: "12, Malviya Nagar Sector 4, Jaipur",
    bloodGroup: "O+",
    emergencyContact: "Vikas Sharma (Husband) - +91 98291 88413",
    allergies: "None reported",
    medicalHistory: "Hypothyroidism, Migraine",
    registrationDate: "2026-09-20",
    abhaId: "91-8832-1102-9943 (Demo Unverified)",
    status: "Active",
    totalVisits: 2,
    outstandingBalance: 0
  },
  {
    id: "PAT-1003",
    name: "Aarav Gupta",
    age: 7,
    dob: "2019-02-14",
    gender: "Male",
    phone: "+91 97840 33219",
    email: "manish.gupta@example-demo.in",
    address: "Flat 402, Royal Residency, Mansarovar, Jaipur",
    bloodGroup: "A+",
    emergencyContact: "Manish Gupta (Father) - +91 97840 33219",
    allergies: "Peanuts, Dust mite sensitivity",
    medicalHistory: "Recurrent allergic bronchitis",
    registrationDate: "2026-10-01",
    abhaId: "Demo Unlinked",
    status: "Active",
    totalVisits: 3,
    outstandingBalance: 0
  },
  {
    id: "PAT-1004",
    name: "Kamla Devi",
    age: 65,
    dob: "1961-11-03",
    gender: "Female",
    phone: "+91 94133 77201",
    email: "rajesh.devi@example-demo.in",
    address: "H-84, Shyam Nagar, Ajmer Road, Jaipur",
    bloodGroup: "AB+",
    emergencyContact: "Rajesh Soni (Son) - +91 94133 77202",
    allergies: "NSAIDs (Diclofenac causes gastric distress)",
    medicalHistory: "Bilateral Osteoarthritis Knees, Hypertension, Hypothyroidism",
    registrationDate: "2026-10-03",
    abhaId: "91-1192-3304-7721 (Demo Unverified)",
    status: "Active",
    totalVisits: 1,
    outstandingBalance: 600
  },
  {
    id: "PAT-1005",
    name: "Vikram Rathore",
    age: 28,
    dob: "1998-06-19",
    gender: "Male",
    phone: "+91 99280 66451",
    email: "vikram.rathore@example-demo.in",
    address: "Plot 19, C-Scheme, Ashok Nagar, Jaipur",
    bloodGroup: "B-",
    emergencyContact: "Mahendra Singh (Brother) - +91 99280 66452",
    allergies: "None",
    medicalHistory: "Acne vulgaris, Atopic dermatitis history",
    registrationDate: "2026-10-05",
    abhaId: "Demo Unlinked",
    status: "Active",
    totalVisits: 1,
    outstandingBalance: 0
  },
  {
    id: "PAT-1006",
    name: "Sunita Choudhary",
    age: 41,
    dob: "1985-09-10",
    gender: "Female",
    phone: "+91 94601 44882",
    email: "sunita.ch@example-demo.in",
    address: "34, Vidyadhar Nagar, Jaipur",
    bloodGroup: "O-",
    emergencyContact: "Deepak Choudhary (Husband) - +91 94601 44883",
    allergies: "Ciprofloxacin",
    medicalHistory: "Fatty liver grade 1, Vitamin D deficiency",
    registrationDate: "2026-10-08",
    abhaId: "91-7712-4409-5561 (Demo Unverified)",
    status: "Active",
    totalVisits: 1,
    outstandingBalance: 1200
  }
];

export const INITIAL_TEST_CATALOGUE = [
  {
    id: "TEST-CBC",
    code: "CBC-01",
    name: "Complete Blood Count (CBC) with ESR",
    category: "Hematology",
    sampleType: "EDTA Whole Blood",
    tubeColor: "Lavender Top (EDTA)",
    container: "3ml K2-EDTA Vacutainer",
    tatHours: 4,
    price: 350,
    costPrice: 85,
    method: "Automated 5-Part Cell Counter & Westergren",
    isActive: true,
    parameters: [
      { name: "Hemoglobin (Hb)", unit: "g/dL", refRange: "13.0 - 17.0 (M), 12.0 - 15.0 (F)", defaultValue: 13.8 },
      { name: "Total Leucocyte Count (TLC)", unit: "/cumm", refRange: "4,000 - 11,000", defaultValue: 7800 },
      { name: "Platelet Count", unit: "lakh/cumm", refRange: "1.50 - 4.50", defaultValue: 2.45 },
      { name: "Packed Cell Volume (PCV)", unit: "%", refRange: "40.0 - 50.0 (M), 36.0 - 46.0 (F)", defaultValue: 42.1 },
      { name: "RBC Count", unit: "mil/cumm", refRange: "4.5 - 5.5", defaultValue: 4.8 },
      { name: "MCV", unit: "fL", refRange: "80.0 - 96.0", defaultValue: 87.5 },
      { name: "MCH", unit: "pg", refRange: "27.0 - 33.0", defaultValue: 28.7 },
      { name: "MCHC", unit: "g/dL", refRange: "32.0 - 36.0", defaultValue: 33.2 },
      { name: "Neutrophils", unit: "%", refRange: "40 - 70", defaultValue: 62 },
      { name: "Lymphocytes", unit: "%", refRange: "20 - 45", defaultValue: 30 },
      { name: "Monocytes", unit: "%", refRange: "2 - 8", defaultValue: 5 },
      { name: "Eosinophils", unit: "%", refRange: "1 - 6", defaultValue: 3 },
      { name: "Basophils", unit: "%", refRange: "0 - 1", defaultValue: 0 },
      { name: "ESR (1st Hour)", unit: "mm/hr", refRange: "0 - 15 (M), 0 - 20 (F)", defaultValue: 12 }
    ]
  },
  {
    id: "TEST-GLUC-F",
    code: "BIO-01",
    name: "Fasting Blood Glucose (FBG)",
    category: "Biochemistry",
    sampleType: "Fluoride Plasma",
    tubeColor: "Grey Top (Sodium Fluoride)",
    container: "2ml Fluoride Vacutainer",
    tatHours: 3,
    price: 100,
    costPrice: 20,
    method: "GOD-POD Spectrophotometry",
    isActive: true,
    parameters: [
      { name: "Fasting Blood Sugar", unit: "mg/dL", refRange: "70 - 99 (Normal), 100 - 125 (Prediabetic)", defaultValue: 104 }
    ]
  },
  {
    id: "TEST-HBA1C",
    code: "BIO-02",
    name: "Glycated Hemoglobin (HbA1c)",
    category: "Biochemistry",
    sampleType: "EDTA Whole Blood",
    tubeColor: "Lavender Top (EDTA)",
    container: "2ml EDTA Vacutainer",
    tatHours: 4,
    price: 500,
    costPrice: 160,
    method: "High Performance Liquid Chromatography (HPLC)",
    isActive: true,
    parameters: [
      { name: "HbA1c Level", unit: "%", refRange: "< 5.7 (Normal), 5.7 - 6.4 (Prediabetes), >= 6.5 (Diabetic)", defaultValue: 7.2 },
      { name: "Estimated Average Glucose (eAG)", unit: "mg/dL", refRange: "90 - 120", defaultValue: 160 }
    ]
  },
  {
    id: "TEST-LIPID",
    code: "BIO-03",
    name: "Lipid Profile Panel (Complete)",
    category: "Biochemistry",
    sampleType: "Serum",
    tubeColor: "Red/Yellow Top (SST Clot Activator)",
    container: "4ml SST Gel Vacutainer",
    tatHours: 5,
    price: 650,
    costPrice: 140,
    method: "Enzymatic Colorimetric",
    isActive: true,
    parameters: [
      { name: "Total Cholesterol", unit: "mg/dL", refRange: "< 200 (Desirable), 200 - 239 (Borderline)", defaultValue: 218 },
      { name: "Serum Triglycerides", unit: "mg/dL", refRange: "< 150 (Normal), 150 - 199 (Borderline)", defaultValue: 185 },
      { name: "HDL Cholesterol", unit: "mg/dL", refRange: "> 40 (M), > 50 (F)", defaultValue: 42 },
      { name: "LDL Cholesterol (Calculated)", unit: "mg/dL", refRange: "< 100 (Optimal), 100 - 129 (Near optimal)", defaultValue: 139 },
      { name: "VLDL Cholesterol", unit: "mg/dL", refRange: "< 30", defaultValue: 37 },
      { name: "Cholesterol / HDL Ratio", unit: "Ratio", refRange: "< 4.5", defaultValue: 5.19 }
    ]
  },
  {
    id: "TEST-LFT",
    code: "BIO-04",
    name: "Liver Function Test (LFT)",
    category: "Biochemistry",
    sampleType: "Serum",
    tubeColor: "Yellow Top (SST Gel)",
    container: "4ml Clot Activator Gel Tube",
    tatHours: 5,
    price: 600,
    costPrice: 130,
    method: "Spectrophotometric Multiplex",
    isActive: true,
    parameters: [
      { name: "Total Bilirubin", unit: "mg/dL", refRange: "0.2 - 1.2", defaultValue: 0.9 },
      { name: "Direct Bilirubin", unit: "mg/dL", refRange: "0.0 - 0.3", defaultValue: 0.2 },
      { name: "Indirect Bilirubin", unit: "mg/dL", refRange: "0.1 - 0.9", defaultValue: 0.7 },
      { name: "SGOT / AST", unit: "U/L", refRange: "10 - 40", defaultValue: 34 },
      { name: "SGPT / ALT", unit: "U/L", refRange: "10 - 45", defaultValue: 48 },
      { name: "Alkaline Phosphatase (ALP)", unit: "U/L", refRange: "40 - 130", defaultValue: 96 },
      { name: "Total Protein", unit: "g/dL", refRange: "6.4 - 8.3", defaultValue: 7.2 },
      { name: "Serum Albumin", unit: "g/dL", refRange: "3.5 - 5.0", defaultValue: 4.1 },
      { name: "A:G Ratio", unit: "Ratio", refRange: "1.2 - 2.2", defaultValue: 1.32 }
    ]
  },
  {
    id: "TEST-KFT",
    code: "BIO-05",
    name: "Kidney Function Test (KFT / RFT) with Electrolytes",
    category: "Biochemistry",
    sampleType: "Serum",
    tubeColor: "Yellow Top (SST Gel)",
    container: "4ml Clot Activator Gel Tube",
    tatHours: 5,
    price: 600,
    costPrice: 135,
    method: "Kinetic UV & Ion-Selective Electrode",
    isActive: true,
    parameters: [
      { name: "Blood Urea", unit: "mg/dL", refRange: "15 - 40", defaultValue: 28 },
      { name: "Serum Creatinine", unit: "mg/dL", refRange: "0.7 - 1.3 (M), 0.5 - 1.1 (F)", defaultValue: 1.05 },
      { name: "Serum Uric Acid", unit: "mg/dL", refRange: "3.5 - 7.2 (M), 2.6 - 6.0 (F)", defaultValue: 5.6 },
      { name: "Serum Sodium (Na+)", unit: "mmol/L", refRange: "135 - 148", defaultValue: 140 },
      { name: "Serum Potassium (K+)", unit: "mmol/L", refRange: "3.5 - 5.2", defaultValue: 4.3 }
    ]
  },
  {
    id: "TEST-THYROID",
    code: "IMM-01",
    name: "Thyroid Profile (Total T3, Total T4, TSH)",
    category: "Endocrinology",
    sampleType: "Serum",
    tubeColor: "Yellow Top (SST Gel)",
    container: "4ml Clot Activator Gel Tube",
    tatHours: 6,
    price: 550,
    costPrice: 150,
    method: "Chemiluminescence Immunoassay (CLIA)",
    isActive: true,
    parameters: [
      { name: "Total Triiodothyronine (T3)", unit: "ng/mL", refRange: "0.8 - 2.0", defaultValue: 1.15 },
      { name: "Total Thyroxine (T4)", unit: "ug/dL", refRange: "5.1 - 14.1", defaultValue: 7.8 },
      { name: "Thyroid Stimulating Hormone (TSH)", unit: "uIU/mL", refRange: "0.45 - 4.50 (Normal adult)", defaultValue: 5.82 }
    ]
  },
  {
    id: "TEST-URINE",
    code: "CP-01",
    name: "Urine Routine & Microscopic Examination (Urine R/M)",
    category: "Clinical Pathology",
    sampleType: "Urine (Fresh Midstream)",
    tubeColor: "Sterile Urine Container",
    container: "30ml Wide-mouth sterile container",
    tatHours: 2,
    price: 150,
    costPrice: 30,
    method: "Automated Strip Reflectance & High-power Microscopy",
    isActive: true,
    parameters: [
      { name: "Color & Appearance", unit: "", refRange: "Pale Yellow, Clear", defaultValue: "Pale Yellow, Clear" },
      { name: "Specific Gravity", unit: "", refRange: "1.005 - 1.030", defaultValue: "1.018" },
      { name: "pH", unit: "", refRange: "5.0 - 7.5", defaultValue: "6.0" },
      { name: "Urine Protein / Albumin", unit: "", refRange: "Nil / Absent", defaultValue: "Nil" },
      { name: "Urine Sugar / Glucose", unit: "", refRange: "Nil / Absent", defaultValue: "Trace" },
      { name: "Pus Cells (WBC)", unit: "/hpf", refRange: "0 - 4", defaultValue: "2 - 3" },
      { name: "RBCs", unit: "/hpf", refRange: "Nil / 0 - 2", defaultValue: "Nil" },
      { name: "Epithelial Cells", unit: "/hpf", refRange: "1 - 4", defaultValue: "2 - 4" },
      { name: "Casts & Crystals", unit: "", refRange: "Not seen", defaultValue: "Nil" }
    ]
  },
  {
    id: "TEST-VIT-D",
    code: "IMM-02",
    name: "Vitamin D (25-Hydroxy)",
    category: "Endocrinology",
    sampleType: "Serum",
    tubeColor: "Yellow Top (SST Gel)",
    container: "4ml Clot Activator Gel Tube",
    tatHours: 8,
    price: 1200,
    costPrice: 380,
    method: "Chemiluminescent Immunoassay (CLIA)",
    isActive: true,
    parameters: [
      { name: "25-OH Vitamin D Total", unit: "ng/mL", refRange: "< 20 (Deficient), 20 - 30 (Insufficient), 30 - 100 (Sufficient)", defaultValue: 18.4 }
    ]
  },
  {
    id: "TEST-DENGUE",
    code: "SER-01",
    name: "Dengue Duo (NS1 Antigen + IgM/IgG Antibodies)",
    category: "Serology",
    sampleType: "Serum",
    tubeColor: "Red/Yellow Top",
    container: "3ml Plain/Gel Tube",
    tatHours: 3,
    price: 750,
    costPrice: 220,
    method: "Immunochromatographic Rapid Lateral Flow & ELISA",
    isActive: true,
    parameters: [
      { name: "Dengue NS1 Antigen", unit: "Result", refRange: "Negative", defaultValue: "Negative" },
      { name: "Dengue IgM Antibody", unit: "Result", refRange: "Negative", defaultValue: "Negative" },
      { name: "Dengue IgG Antibody", unit: "Result", refRange: "Negative", defaultValue: "Negative" }
    ]
  }
];

export const INITIAL_PACKAGES = [
  {
    id: "PKG-01",
    name: "Aarogya Comprehensive Health Package",
    description: "Holistic preventive screening covering blood, liver, kidneys, sugar, lipids, and urine",
    testsIncluded: ["TEST-CBC", "TEST-GLUC-F", "TEST-HBA1C", "TEST-LIPID", "TEST-LFT", "TEST-KFT", "TEST-URINE"],
    originalPrice: 2850,
    packagePrice: 1999,
    discountPercent: 30,
    category: "Executive Screening",
    isActive: true
  },
  {
    id: "PKG-02",
    name: "Diabetes & Cardiac Care Profile",
    description: "Fasting Sugar, HbA1c, Complete Lipid Profile, and Renal function",
    testsIncluded: ["TEST-GLUC-F", "TEST-HBA1C", "TEST-LIPID", "TEST-KFT"],
    originalPrice: 1850,
    packagePrice: 1399,
    discountPercent: 24,
    category: "Chronic Disease Management",
    isActive: true
  },
  {
    id: "PKG-03",
    name: "Fever & Infection Panel",
    description: "CBC with ESR, Dengue Duo, and Urine Routine examination",
    testsIncluded: ["TEST-CBC", "TEST-DENGUE", "TEST-URINE"],
    originalPrice: 1250,
    packagePrice: 999,
    discountPercent: 20,
    category: "Acute Care",
    isActive: true
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-2026-101",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    date: "2026-10-10",
    timeSlot: "10:00 AM - 10:15 AM",
    type: "Follow-up Consultation",
    reason: "Review blood sugar control and HbA1c test reports",
    source: "Front Desk Walk-in",
    status: "In Consultation",
    tokenNumber: "T-01",
    checkedInTime: "09:45 AM",
    priority: "Regular",
    notes: "Patient brought recent lab reports from home",
    fee: 300,
    paymentStatus: "Paid"
  },
  {
    id: "APT-2026-102",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    date: "2026-10-10",
    timeSlot: "10:15 AM - 10:30 AM",
    type: "Review",
    reason: "Fatigue, mild neck discomfort, thyroid checkup",
    source: "Phone Booking",
    status: "Checked In",
    tokenNumber: "T-02",
    checkedInTime: "10:05 AM",
    priority: "Regular",
    notes: "TSH test ordered last week",
    fee: 600,
    paymentStatus: "Paid"
  },
  {
    id: "APT-2026-103",
    patientId: "PAT-1004",
    patientName: "Kamla Devi",
    doctorId: "DOC-02",
    doctorName: "Dr. Rohit Mehta",
    date: "2026-10-10",
    timeSlot: "10:30 AM - 10:50 AM",
    type: "New Consultation",
    reason: "Severe knee pain when walking, stairs difficulty",
    source: "Online / WhatsApp",
    status: "Waiting",
    tokenNumber: "T-03",
    checkedInTime: "10:18 AM",
    priority: "Senior Citizen",
    notes: "Requires wheelchair assistance from reception",
    fee: 800,
    paymentStatus: "Unpaid"
  },
  {
    id: "APT-2026-104",
    patientId: "PAT-1003",
    patientName: "Aarav Gupta",
    doctorId: "DOC-03",
    doctorName: "Dr. Neha Verma",
    date: "2026-10-10",
    timeSlot: "11:00 AM - 11:15 AM",
    type: "Review",
    reason: "Cough and wheezing episodes at night",
    source: "Front Desk Walk-in",
    status: "Scheduled",
    tokenNumber: "T-04",
    checkedInTime: null,
    priority: "Regular",
    notes: "Pediatric growth assessment due",
    fee: 500,
    paymentStatus: "Unpaid"
  },
  {
    id: "APT-2026-105",
    patientId: "PAT-1005",
    patientName: "Vikram Rathore",
    doctorId: "DOC-04",
    doctorName: "Dr. Arjun Singh",
    date: "2026-10-10",
    timeSlot: "11:30 AM - 11:45 AM",
    type: "New Consultation",
    reason: "Facial acne flare-up and persistent itchy skin rash",
    source: "Website Demo",
    status: "Scheduled",
    tokenNumber: "T-05",
    checkedInTime: null,
    priority: "Regular",
    notes: "First time consultation",
    fee: 700,
    paymentStatus: "Unpaid"
  },
  {
    id: "APT-2026-106",
    patientId: "PAT-1006",
    patientName: "Sunita Choudhary",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    date: "2026-10-10",
    timeSlot: "12:00 PM - 12:15 PM",
    type: "Follow-up Consultation",
    reason: "Fatty liver dietary review and Vitamin D re-test",
    source: "Phone Booking",
    status: "Scheduled",
    tokenNumber: "T-06",
    checkedInTime: null,
    priority: "Regular",
    notes: "Follow-up from 2 weeks ago",
    fee: 300,
    paymentStatus: "Unpaid"
  }
];

export const INITIAL_VISITS = [
  {
    id: "VIS-901",
    appointmentId: "APT-2026-101",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    date: "2026-10-10",
    time: "10:02 AM",
    chiefComplaint: "Follow-up for uncontrolled Fasting Sugar; reported mild post-dinner lethargy and morning dry mouth.",
    symptoms: ["Increased thirst", "Mild polyuria", "Afternoon fatigue"],
    vitals: {
      bpSystolic: 132,
      bpDiastolic: 84,
      pulse: 76,
      temperature: 98.4,
      respRate: 18,
      spo2: 98,
      heightCm: 172,
      weightKg: 81.5,
      bmi: 27.5,
      bmiCategory: "Overweight"
    },
    examinationNotes: "Alert, well-oriented. No pallor, pedal edema absent. Chest clear bilaterally, S1 S2 heard. Abdomen soft, non-tender.",
    diagnosisRecords: [
      { code: "E11.9", name: "Type 2 Diabetes Mellitus without complications", type: "Primary Chronic" },
      { code: "I10", name: "Essential (Primary) Hypertension", type: "Secondary Stable" }
    ],
    treatmentPlan: "Step up Metformin to 1000mg with evening meal. Continue Telmisartan 40mg morning. Strict low-GI carbohydrate diet, 40 min brisk walking.",
    prescriptions: [
      { medicine: "Tab Metformin SR", strength: "1000 mg", dosage: "1 tablet", frequency: "1-0-1 (After Meals)", duration: "30 days", instructions: "Take after dinner with plenty of water" },
      { medicine: "Tab Telmisartan", strength: "40 mg", dosage: "1 tablet", frequency: "1-0-0 (Morning)", duration: "30 days", instructions: "Take before breakfast" },
      { medicine: "Cap Methylcobalamin + Alpha Lipoic Acid", strength: "1500 mcg", dosage: "1 capsule", frequency: "0-1-0 (After Lunch)", duration: "30 days", instructions: "For peripheral nerve health" }
    ],
    labOrdersRequested: ["TEST-HBA1C", "TEST-LIPID", "TEST-KFT"],
    followupDate: "2026-11-10",
    followupNotes: "Repeat HbA1c and Serum Creatinine after 30 days.",
    status: "In Progress"
  },
  {
    id: "VIS-895",
    appointmentId: "APT-2026-092",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    date: "2026-10-02",
    time: "11:15 AM",
    chiefComplaint: "Generalized weakness, unexplained weight gain of 3kg over 2 months, intolerance to cold weather.",
    symptoms: ["Lethargy", "Dry skin", "Constipation"],
    vitals: {
      bpSystolic: 118,
      bpDiastolic: 76,
      pulse: 68,
      temperature: 97.9,
      respRate: 16,
      spo2: 99,
      heightCm: 160,
      weightKg: 64.0,
      bmi: 25.0,
      bmiCategory: "Overweight"
    },
    examinationNotes: "Mild periorbital puffiness. Thyroid gland mildly enlarged, smooth, non-tender. Reflexes sluggish.",
    diagnosisRecords: [
      { code: "E03.9", name: "Hypothyroidism, unspecified", type: "Primary Provisional" }
    ],
    treatmentPlan: "Initiate Thyroxine supplementation pending confirmed TSH report. Advised high fiber diet.",
    prescriptions: [
      { medicine: "Tab Thyroxine Sodium", strength: "50 mcg", dosage: "1 tablet", frequency: "1-0-0 (Empty Stomach)", duration: "30 days", instructions: "Take immediately upon waking, wait 45 mins before tea/breakfast" }
    ],
    labOrdersRequested: ["TEST-THYROID", "TEST-CBC"],
    followupDate: "2026-10-10",
    followupNotes: "Check TSH report response and adjust dosage.",
    status: "Completed"
  }
];

export const INITIAL_LAB_ORDERS = [
  {
    id: "LBO-2026-081",
    orderNo: "LBO-081",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    visitId: "VIS-901",
    orderDate: "2026-10-10",
    orderTime: "10:10 AM",
    priority: "Routine",
    testIds: ["TEST-HBA1C", "TEST-LIPID", "TEST-KFT"],
    totalAmount: 1750,
    paidAmount: 1400,
    balanceAmount: 350,
    status: "Sample Collected",
    samples: [
      {
        sampleId: "SMP-8801",
        barcode: "AAR-8801-EDTA",
        testId: "TEST-HBA1C",
        testName: "Glycated Hemoglobin (HbA1c)",
        sampleType: "EDTA Whole Blood",
        tube: "Lavender EDTA Tube",
        collectionLocation: "Phlebotomy Station 1",
        collector: "Rahul Jain",
        collectedAt: "2026-10-10 10:20 AM",
        status: "Received in Lab",
        processingStartedAt: "2026-10-10 10:25 AM",
        notes: "Good volume, no hemolysis"
      },
      {
        sampleId: "SMP-8802",
        barcode: "AAR-8802-SST",
        testId: "TEST-LIPID",
        testName: "Lipid Profile Panel (Complete)",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        collectionLocation: "Phlebotomy Station 1",
        collector: "Rahul Jain",
        collectedAt: "2026-10-10 10:20 AM",
        status: "Processing",
        processingStartedAt: "2026-10-10 10:30 AM",
        notes: "Centrifuged at 3000 RPM for 10 min"
      },
      {
        sampleId: "SMP-8803",
        barcode: "AAR-8803-SST",
        testId: "TEST-KFT",
        testName: "Kidney Function Test (KFT)",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        collectionLocation: "Phlebotomy Station 1",
        collector: "Rahul Jain",
        collectedAt: "2026-10-10 10:20 AM",
        status: "Processing",
        processingStartedAt: "2026-10-10 10:30 AM",
        notes: "Clear serum separated"
      }
    ],
    notes: "Fasting maintained 10 hours overnight"
  },
  {
    id: "LBO-2026-079",
    orderNo: "LBO-079",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    visitId: "VIS-895",
    orderDate: "2026-10-08",
    orderTime: "08:30 AM",
    priority: "Routine",
    testIds: ["TEST-THYROID", "TEST-CBC"],
    totalAmount: 900,
    paidAmount: 900,
    balanceAmount: 0,
    status: "Report Released",
    reportId: "REP-2026-304",
    samples: [
      {
        sampleId: "SMP-8740",
        barcode: "AAR-8740-SST",
        testId: "TEST-THYROID",
        testName: "Thyroid Profile",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        collectedAt: "2026-10-08 08:45 AM",
        collector: "Rahul Jain",
        status: "Completed",
        notes: "Verified by Pathologist"
      },
      {
        sampleId: "SMP-8741",
        barcode: "AAR-8741-EDTA",
        testId: "TEST-CBC",
        testName: "Complete Blood Count",
        sampleType: "EDTA Whole Blood",
        tube: "Lavender EDTA Tube",
        collectedAt: "2026-10-08 08:45 AM",
        collector: "Rahul Jain",
        status: "Completed",
        notes: "Automated analysis completed"
      }
    ]
  },
  {
    id: "LBO-2026-075",
    orderNo: "LBO-075",
    patientId: "PAT-1006",
    patientName: "Sunita Choudhary",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    orderDate: "2026-10-09",
    orderTime: "11:00 AM",
    priority: "Routine",
    testIds: ["TEST-LFT", "TEST-VIT-D"],
    totalAmount: 1800,
    paidAmount: 600,
    balanceAmount: 1200,
    status: "Awaiting Review",
    samples: [
      {
        sampleId: "SMP-8761",
        barcode: "AAR-8761-SST",
        testId: "TEST-LFT",
        testName: "Liver Function Test",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        collectedAt: "2026-10-09 11:15 AM",
        collector: "Rahul Jain",
        status: "Results Entered",
        notes: "Elevated SGPT flagged"
      },
      {
        sampleId: "SMP-8762",
        barcode: "AAR-8762-SST",
        testId: "TEST-VIT-D",
        testName: "Vitamin D (25-OH)",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        collectedAt: "2026-10-09 11:15 AM",
        collector: "Rahul Jain",
        status: "Results Entered",
        notes: "Low level (18.4 ng/mL)"
      }
    ]
  },
  {
    id: "LBO-2026-082",
    orderNo: "LBO-082",
    patientId: "PAT-1004",
    patientName: "Kamla Devi",
    doctorId: "DOC-02",
    doctorName: "Dr. Rohit Mehta",
    orderDate: "2026-10-10",
    orderTime: "10:35 AM",
    priority: "Urgent",
    testIds: ["TEST-CBC", "TEST-KFT"],
    totalAmount: 950,
    paidAmount: 350,
    balanceAmount: 600,
    status: "Awaiting Collection",
    samples: [
      {
        sampleId: "SMP-8810",
        barcode: "AAR-8810-EDTA",
        testId: "TEST-CBC",
        testName: "Complete Blood Count",
        sampleType: "EDTA Whole Blood",
        tube: "Lavender EDTA Tube",
        status: "Awaiting Collection",
        collector: null,
        collectedAt: null
      },
      {
        sampleId: "SMP-8811",
        barcode: "AAR-8811-SST",
        testId: "TEST-KFT",
        testName: "Kidney Function Test",
        sampleType: "Serum",
        tube: "Yellow SST Gel Tube",
        status: "Awaiting Collection",
        collector: null,
        collectedAt: null
      }
    ]
  }
];

export const INITIAL_REPORTS = [
  {
    id: "REP-2026-304",
    orderId: "LBO-2026-079",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    patientAge: 32,
    patientGender: "Female",
    doctorName: "Dr. Ananya Sharma",
    reportedAt: "2026-10-08 04:30 PM",
    verifiedBy: "Dr. Rajesh Khandelwal, MD (Pathology)",
    pathologistRegNo: "RMC-18290",
    status: "Released",
    disclaimer: "DEMONSTRATION REPORT — NOT FOR CLINICAL USE",
    testResults: [
      {
        testName: "Thyroid Profile (Total T3, Total T4, TSH)",
        category: "Endocrinology",
        method: "Chemiluminescence Immunoassay (CLIA)",
        parameters: [
          { name: "Total Triiodothyronine (T3)", value: "1.15", unit: "ng/mL", refRange: "0.8 - 2.0", flag: "Normal" },
          { name: "Total Thyroxine (T4)", value: "7.8", unit: "ug/dL", refRange: "5.1 - 14.1", flag: "Normal" },
          { name: "Thyroid Stimulating Hormone (TSH)", value: "5.82", unit: "uIU/mL", refRange: "0.45 - 4.50", flag: "High" }
        ],
        clinicalRemarks: "TSH is mildly elevated with normal T3/T4, consistent with subclinical hypothyroidism. Clinical correlation suggested."
      },
      {
        testName: "Complete Blood Count (CBC)",
        category: "Hematology",
        method: "Automated 5-Part Cell Counter",
        parameters: [
          { name: "Hemoglobin (Hb)", value: "12.4", unit: "g/dL", refRange: "12.0 - 15.0", flag: "Normal" },
          { name: "Total Leucocyte Count (TLC)", value: "6,900", unit: "/cumm", refRange: "4,000 - 11,000", flag: "Normal" },
          { name: "Platelet Count", value: "2.10", unit: "lakh/cumm", refRange: "1.50 - 4.50", flag: "Normal" },
          { name: "ESR (1st Hour)", value: "14", unit: "mm/hr", refRange: "0 - 20", flag: "Normal" }
        ],
        clinicalRemarks: "Hematological indices within acceptable reference limits."
      }
    ]
  },
  {
    id: "REP-2026-302",
    orderId: "LBO-2026-075",
    patientId: "PAT-1006",
    patientName: "Sunita Choudhary",
    patientAge: 41,
    patientGender: "Female",
    doctorName: "Dr. Ananya Sharma",
    reportedAt: "2026-10-09 05:15 PM",
    verifiedBy: "Dr. Rajesh Khandelwal, MD (Pathology)",
    pathologistRegNo: "RMC-18290",
    status: "Awaiting Review",
    disclaimer: "DEMONSTRATION REPORT — NOT FOR CLINICAL USE",
    testResults: [
      {
        testName: "Liver Function Test (LFT)",
        category: "Biochemistry",
        method: "Spectrophotometric Multiplex",
        parameters: [
          { name: "Total Bilirubin", value: "0.8", unit: "mg/dL", refRange: "0.2 - 1.2", flag: "Normal" },
          { name: "SGOT / AST", value: "38", unit: "U/L", refRange: "10 - 40", flag: "Normal" },
          { name: "SGPT / ALT", value: "62", unit: "U/L", refRange: "10 - 45", flag: "High" },
          { name: "Alkaline Phosphatase (ALP)", value: "112", unit: "U/L", refRange: "40 - 130", flag: "Normal" }
        ],
        clinicalRemarks: "Isolated mild elevation of SGPT/ALT. Suggested correlation with dietary habits and ultrasound findings."
      },
      {
        testName: "Vitamin D (25-Hydroxy)",
        category: "Endocrinology",
        method: "Chemiluminescent Immunoassay (CLIA)",
        parameters: [
          { name: "25-OH Vitamin D Total", value: "18.4", unit: "ng/mL", refRange: "30 - 100", flag: "Low" }
        ],
        clinicalRemarks: "Deficient Vitamin D status. Cholecalciferol supplementation advised as per treating physician."
      }
    ]
  }
];

export const INITIAL_INVOICES = [
  {
    id: "INV-2026-501",
    invoiceNo: "INV-501",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    date: "2026-10-10",
    time: "10:12 AM",
    items: [
      { description: "Doctor Follow-up Consultation (Dr. Ananya Sharma)", type: "Consultation", qty: 1, rate: 300, amount: 300 },
      { description: "Glycated Hemoglobin (HbA1c)", type: "Lab Test", qty: 1, rate: 500, amount: 500 },
      { description: "Lipid Profile Panel", type: "Lab Test", qty: 1, rate: 650, amount: 650 },
      { description: "Kidney Function Test (KFT)", type: "Lab Test", qty: 1, rate: 600, amount: 600 }
    ],
    subtotal: 2050,
    discountAmount: 0,
    taxPercent: 0,
    taxAmount: 0,
    totalAmount: 2050,
    paidAmount: 1700,
    balanceDue: 350,
    paymentStatus: "Partial",
    payments: [
      { paymentId: "PAY-901", date: "2026-10-10", amount: 1700, method: "UPI (Google Pay)", reference: "UPI/3991024410", cashier: "Priya Gupta" }
    ]
  },
  {
    id: "INV-2026-498",
    invoiceNo: "INV-498",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    date: "2026-10-08",
    time: "08:35 AM",
    items: [
      { description: "Thyroid Profile (Total T3, Total T4, TSH)", type: "Lab Test", qty: 1, rate: 550, amount: 550 },
      { description: "Complete Blood Count (CBC)", type: "Lab Test", qty: 1, rate: 350, amount: 350 }
    ],
    subtotal: 900,
    discountAmount: 0,
    taxPercent: 0,
    taxAmount: 0,
    totalAmount: 900,
    paidAmount: 900,
    balanceDue: 0,
    paymentStatus: "Paid",
    payments: [
      { paymentId: "PAY-882", date: "2026-10-08", amount: 900, method: "Cash", reference: "CSH-REC-882", cashier: "Priya Gupta" }
    ]
  },
  {
    id: "INV-2026-499",
    invoiceNo: "INV-499",
    patientId: "PAT-1006",
    patientName: "Sunita Choudhary",
    date: "2026-10-09",
    time: "11:05 AM",
    items: [
      { description: "Liver Function Test (LFT)", type: "Lab Test", qty: 1, rate: 600, amount: 600 },
      { description: "Vitamin D (25-Hydroxy)", type: "Lab Test", qty: 1, rate: 1200, amount: 1200 }
    ],
    subtotal: 1800,
    discountAmount: 0,
    taxPercent: 0,
    taxAmount: 0,
    totalAmount: 1800,
    paidAmount: 600,
    balanceDue: 1200,
    paymentStatus: "Partial",
    payments: [
      { paymentId: "PAY-890", date: "2026-10-09", amount: 600, method: "Debit Card (HDFC POS)", reference: "POS-TXN-6612", cashier: "Priya Gupta" }
    ]
  },
  {
    id: "INV-2026-502",
    invoiceNo: "INV-502",
    patientId: "PAT-1004",
    patientName: "Kamla Devi",
    date: "2026-10-10",
    time: "10:20 AM",
    items: [
      { description: "Orthopedic Specialist Consultation (Dr. Rohit Mehta)", type: "Consultation", qty: 1, rate: 800, amount: 800 }
    ],
    subtotal: 800,
    discountAmount: 200,
    discountReason: "Senior Citizen Privilege Discount (25%)",
    taxPercent: 0,
    taxAmount: 0,
    totalAmount: 600,
    paidAmount: 0,
    balanceDue: 600,
    paymentStatus: "Unpaid",
    payments: []
  }
];

export const INITIAL_INVENTORY = [
  {
    id: "INV-ITEM-01",
    name: "EDTA K2 Blood Collection Tubes (3ml Lavender Top)",
    category: "Sample Collection Supplies",
    unit: "Box of 100",
    supplier: "BD Vacutainer India Ltd",
    currentStock: 18,
    minStock: 8,
    unitCost: 650,
    batchNo: "BD-2026-K2-89",
    expiryDate: "2027-08-31",
    storageLocation: "Central Phlebotomy Store Rack A2",
    status: "Adequate"
  },
  {
    id: "INV-ITEM-02",
    name: "SST Gel Clot Activator Tubes (4ml Yellow Top)",
    category: "Sample Collection Supplies",
    unit: "Box of 100",
    supplier: "BD Vacutainer India Ltd",
    currentStock: 24,
    minStock: 10,
    unitCost: 720,
    batchNo: "BD-2026-SST-41",
    expiryDate: "2027-11-30",
    storageLocation: "Central Phlebotomy Store Rack A3",
    status: "Adequate"
  },
  {
    id: "INV-ITEM-03",
    name: "Fluoride Glucose Vacutainer Tubes (2ml Grey Top)",
    category: "Sample Collection Supplies",
    unit: "Box of 100",
    supplier: "Dispovan Healthcare",
    currentStock: 6,
    minStock: 8,
    unitCost: 580,
    batchNo: "DISP-2025-FL-02",
    expiryDate: "2026-12-15",
    storageLocation: "Central Phlebotomy Store Rack A4",
    status: "Low Stock"
  },
  {
    id: "INV-ITEM-04",
    name: "Erba Chem-7 Biochemistry Reagent Kit (SGPT/ALT)",
    category: "Lab Reagents",
    unit: "Kit (4x50ml)",
    supplier: "Transasia Bio-Medicals Ltd",
    currentStock: 3,
    minStock: 4,
    unitCost: 2800,
    batchNo: "TRANS-ALT-991",
    expiryDate: "2026-11-20",
    storageLocation: "Bio-Reagent Refrigerator R1 (2°C - 8°C)",
    status: "Expiring Soon"
  },
  {
    id: "INV-ITEM-05",
    name: "Sysmex KX-21 Cell Pack Diluent (20 Litres)",
    category: "Lab Reagents",
    unit: "20L Container",
    supplier: "Sysmex India Pvt Ltd",
    currentStock: 4,
    minStock: 2,
    unitCost: 4500,
    batchNo: "SYS-DIL-4402",
    expiryDate: "2027-05-10",
    storageLocation: "Hematology Lab Ground Staging",
    status: "Adequate"
  },
  {
    id: "INV-ITEM-06",
    name: "HbA1c HPLC Reagent Buffer Pack A & B",
    category: "Lab Reagents",
    unit: "Pack of 200 Tests",
    supplier: "Bio-Rad Laboratories India",
    currentStock: 2,
    minStock: 2,
    unitCost: 14500,
    batchNo: "BR-HPLC-1104",
    expiryDate: "2027-03-31",
    storageLocation: "Bio-Reagent Refrigerator R2 (2°C - 8°C)",
    status: "Adequate"
  },
  {
    id: "INV-ITEM-07",
    name: "Nitrile Examination Gloves (Medium)",
    category: "Medical Consumables",
    unit: "Box of 100",
    supplier: "Romsons Scientific",
    currentStock: 35,
    minStock: 15,
    unitCost: 320,
    batchNo: "ROM-GLV-26",
    expiryDate: "2029-01-01",
    storageLocation: "OPD Utility Cupboard 3",
    status: "Adequate"
  },
  {
    id: "INV-ITEM-08",
    name: "Alcohol Prep Swabs (70% Isopropanol)",
    category: "Medical Consumables",
    unit: "Box of 200",
    supplier: "Romsons Scientific",
    currentStock: 8,
    minStock: 10,
    unitCost: 190,
    batchNo: "ROM-SWB-92",
    expiryDate: "2028-06-30",
    storageLocation: "Phlebotomy Station Drawers",
    status: "Low Stock"
  }
];

export const INITIAL_SUPPLIERS = [
  {
    id: "SUP-01",
    name: "Transasia Bio-Medicals Ltd",
    contactPerson: "Virendra Saxena",
    phone: "+91 98292 99401",
    email: "jaipur.sales@transasia.co.in",
    city: "Jaipur Regional Hub",
    gstin: "27AAACT1294F1ZT",
    category: "Biochemistry & Hematology Reagents",
    paymentTerms: "Net 30 Days",
    outstandingPayable: 14200,
    status: "Active"
  },
  {
    id: "SUP-02",
    name: "BD Vacutainer India Pvt Ltd",
    contactPerson: "Sunil Agarwal",
    phone: "+91 94140 33810",
    email: "orders.north@bd.com",
    city: "Gurugram / Jaipur Depot",
    gstin: "06AAACB8812D1ZW",
    category: "Phlebotomy & Sample Collection Vacutainers",
    paymentTerms: "Net 15 Days",
    outstandingPayable: 8600,
    status: "Active"
  },
  {
    id: "SUP-03",
    name: "Romsons Scientific & Surgical",
    contactPerson: "Deepak Mathur",
    phone: "+91 98290 77112",
    email: "mathur.med@romsons.in",
    city: "Jaipur Central",
    gstin: "08AABCR4410H1ZS",
    category: "Gloves, Syringes, Swabs, PPE",
    paymentTerms: "Immediate / 7 Days",
    outstandingPayable: 2400,
    status: "Active"
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "EXP-2026-101",
    date: "2026-10-09",
    category: "Lab Consumables & Reagents",
    payee: "Transasia Bio-Medicals Ltd",
    description: "Emergency replenishment of SGPT and Creatinine reagent packs",
    amount: 5600,
    paymentMethod: "Bank Transfer (NEFT)",
    reference: "NEFT/ICICI/89912044",
    approvedBy: "Sunita Yadav",
    status: "Paid"
  },
  {
    id: "EXP-2026-102",
    date: "2026-10-08",
    category: "Biomedical Waste Disposal",
    payee: "Jaipur Enviro Waste Management Services",
    description: "Monthly incineration and yellow/red bio-hazard bin clearance fee",
    amount: 3200,
    paymentMethod: "Cheque",
    reference: "CHQ #440192",
    approvedBy: "Sunita Yadav",
    status: "Paid"
  },
  {
    id: "EXP-2026-103",
    date: "2026-10-05",
    category: "Electricity & Air Conditioning",
    payee: "Jaipur Vidyut Vitran Nigam Ltd (JVVNL)",
    description: "Monthly clinic power bill for Tonk Road branch",
    amount: 14850,
    paymentMethod: "NetBanking",
    reference: "JVVNL-TXN-100488",
    approvedBy: "Dr. Arvind Singhal",
    status: "Paid"
  },
  {
    id: "EXP-2026-104",
    date: "2026-10-04",
    category: "Stationery & Barcode Labels",
    payee: "Shree Balaji Paper & Prints",
    description: "Thermal barcode roll cartridges and letterhead sheets",
    amount: 1850,
    paymentMethod: "Cash",
    reference: "CSH-VOUCH-104",
    approvedBy: "Amit Verma",
    status: "Paid"
  }
];

export const INITIAL_FOLLOWUPS = [
  {
    id: "FOL-01",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    phone: "+91 94140 55120",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    recommendedDate: "2026-11-10",
    reason: "Repeat HbA1c, Serum Creatinine & review stepped-up Metformin response",
    status: "Upcoming",
    reminderStatus: "Pending Dispatch",
    lastContactDate: null
  },
  {
    id: "FOL-02",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    phone: "+91 98291 88412",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    recommendedDate: "2026-10-10",
    reason: "Review TSH report results and start Thyroxine 50mcg",
    status: "Due Today",
    reminderStatus: "Sent via WhatsApp Simulation",
    lastContactDate: "2026-10-09 06:00 PM"
  },
  {
    id: "FOL-03",
    patientId: "PAT-1006",
    patientName: "Sunita Choudhary",
    phone: "+91 94601 44882",
    doctorId: "DOC-01",
    doctorName: "Dr. Ananya Sharma",
    recommendedDate: "2026-10-23",
    reason: "Repeat liver enzymes check (SGPT/ALT) after lifestyle adjustment",
    status: "Upcoming",
    reminderStatus: "Pending Dispatch",
    lastContactDate: null
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    title: "Critical Lab Value Flagged",
    message: "Patient Ramesh Kumar: Fasting Glucose 218 mg/dL entered by Technician. Review advised.",
    category: "Laboratory",
    priority: "High",
    timestamp: "10 mins ago",
    read: false,
    link: "laboratory"
  },
  {
    id: "NOTIF-02",
    title: "Patient Checked In",
    message: "Priya Sharma (Token T-02) has checked in at Reception for Dr. Ananya Sharma.",
    category: "Queue",
    priority: "Normal",
    timestamp: "25 mins ago",
    read: false,
    link: "queue"
  },
  {
    id: "NOTIF-03",
    title: "Reagent Expiry Warning",
    message: "Erba Chem-7 SGPT/ALT Reagent Kit batch TRANS-ALT-991 expires on 20 Nov 2026.",
    category: "Inventory",
    priority: "Warning",
    timestamp: "1 hour ago",
    read: false,
    link: "inventory"
  },
  {
    id: "NOTIF-04",
    title: "Report Approved & Released",
    message: "Thyroid & CBC report for Priya Sharma (REP-2026-304) authorized by Dr. Rajesh Khandelwal.",
    category: "Laboratory",
    priority: "Normal",
    timestamp: "2 hours ago",
    read: true,
    link: "laboratory"
  }
];

export const INITIAL_STAFF = [
  { id: "STF-01", name: "Priya Gupta", role: "Receptionist / Front Desk", department: "Front Office", branch: "Tonk Road Main", phone: "+91 98295 11022", joiningDate: "2024-03-15", shift: "Morning (08:00 AM - 04:00 PM)", status: "Active" },
  { id: "STF-02", name: "Rahul Jain", role: "Senior Lab Technician (DMLT)", department: "Pathology Lab", branch: "Tonk Road Main", phone: "+91 98295 22033", joiningDate: "2023-08-01", shift: "Morning (07:30 AM - 03:30 PM)", status: "Active" },
  { id: "STF-03", name: "Kavita Sharma", role: "Laboratory Manager (M.Sc. MLT)", department: "Pathology Lab", branch: "Tonk Road Main", phone: "+91 98295 33044", joiningDate: "2022-11-10", shift: "General (09:00 AM - 05:30 PM)", status: "Active" },
  { id: "STF-04", name: "Amit Verma", role: "Accountant & Cashier", department: "Finance & Accounts", branch: "Tonk Road Main", phone: "+91 98295 44055", joiningDate: "2023-01-20", shift: "General (09:30 AM - 06:30 PM)", status: "Active" },
  { id: "STF-05", name: "Sunita Yadav", role: "Clinic Administrator", department: "Administration", branch: "Tonk Road Main", phone: "+91 98295 55066", joiningDate: "2022-05-01", shift: "General (09:00 AM - 06:00 PM)", status: "Active" }
];

export const INITIAL_ACTIVITY_LOGS = [
  { id: "ACT-101", user: "Priya Gupta", role: "Receptionist", action: "Patient Checked In", recordType: "Queue", recordId: "APT-2026-101", timestamp: "10-Oct-2026 09:45 AM", summary: "Assigned token T-01 for Ramesh Kumar with Dr. Ananya Sharma" },
  { id: "ACT-102", user: "Rahul Jain", role: "Lab Technician", action: "Sample Received", recordType: "Specimen", recordId: "SMP-8801", timestamp: "10-Oct-2026 10:25 AM", summary: "Barcoded EDTA tube received for HbA1c HPLC testing" },
  { id: "ACT-103", user: "Dr. Rajesh Khandelwal", role: "Pathologist", action: "Report Released", recordType: "Diagnostic Report", recordId: "REP-2026-304", timestamp: "08-Oct-2026 04:30 PM", summary: "Clinically authorized Thyroid Profile and CBC report for Priya Sharma" },
  { id: "ACT-104", user: "Priya Gupta", role: "Receptionist", action: "Payment Collected", recordType: "Invoice", recordId: "INV-2026-501", timestamp: "10-Oct-2026 10:15 AM", summary: "Collected ₹1,700 via UPI (Google Pay) for consultation and lab items" },
  { id: "ACT-105", user: "Dinesh Meena", role: "Inventory Manager", action: "Stock Issued", recordType: "Inventory", recordId: "INV-ITEM-01", timestamp: "09-Oct-2026 02:30 PM", summary: "Issued 4 boxes of EDTA vacutainer tubes to Central Phlebotomy Counter" }
];

export const INITIAL_CRITICAL_RESULTS = [
  {
    id: "CRIT-01",
    patientId: "PAT-1001",
    patientName: "Ramesh Kumar",
    orderId: "LBO-2026-081",
    testName: "Fasting Blood Glucose",
    parameter: "Fasting Blood Sugar",
    criticalValue: "218 mg/dL",
    threshold: "> 200 mg/dL (Critical High Threshold)",
    flaggedAt: "10-Oct-2026 10:35 AM",
    flaggedBy: "Rahul Jain (Technician)",
    priority: "STAT / Immediate",
    status: "Escalated to Doctor",
    contactLogs: [
      { timestamp: "10-Oct-2026 10:38 AM", contactedPerson: "Dr. Ananya Sharma", method: "Direct Intercom (Room 102)", note: "Informed doctor regarding critical hyperglycemia before patient leaves OPD." }
    ],
    closureNote: ""
  },
  {
    id: "CRIT-02",
    patientId: "PAT-1004",
    patientName: "Kamla Devi",
    orderId: "LBO-2026-071",
    testName: "Serum Potassium",
    parameter: "Potassium (K+)",
    criticalValue: "6.2 mmol/L",
    threshold: "> 6.0 mmol/L (Severe Hyperkalemia)",
    flaggedAt: "08-Oct-2026 03:15 PM",
    flaggedBy: "Rahul Jain (Technician)",
    priority: "Critical Alert",
    status: "Resolved & Closed",
    contactLogs: [
      { timestamp: "08-Oct-2026 03:20 PM", contactedPerson: "Dr. Rohit Mehta", method: "Phone Call", note: "Doctor acknowledged, advised patient to present to Emergency for ECG and calcium gluconate." }
    ],
    closureNote: "Patient emergency review completed. Repeat K+ normalized to 4.7 mmol/L."
  }
];

export const INITIAL_PURCHASE_ORDERS = [
  {
    id: "PO-2026-041",
    poNumber: "PO-041",
    supplierId: "SUP-01",
    supplierName: "Transasia Bio-Medicals Ltd",
    orderDate: "2026-10-06",
    expectedDate: "2026-10-12",
    items: [
      { itemName: "Erba Chem-7 SGPT/ALT Reagent Kit", qty: 4, unitCost: 2800, totalCost: 11200 },
      { itemName: "Erba Chem-7 Creatinine Kinetic Kit", qty: 2, unitCost: 2400, totalCost: 4800 }
    ],
    totalAmount: 16000,
    status: "Partially Received",
    notes: "Batch delivery expected for pathology biochemistry section"
  },
  {
    id: "PO-2026-039",
    poNumber: "PO-039",
    supplierId: "SUP-02",
    supplierName: "BD Vacutainer India Pvt Ltd",
    orderDate: "2026-09-28",
    expectedDate: "2026-10-03",
    items: [
      { itemName: "EDTA K2 Vacutainer Tubes (3ml)", qty: 20, unitCost: 650, totalCost: 13000 },
      { itemName: "SST Gel Clot Activator Tubes (4ml)", qty: 20, unitCost: 720, totalCost: 14400 }
    ],
    totalAmount: 27400,
    status: "Completed & Stocked",
    notes: "Goods received and verified by store keeper"
  }
];

export const INITIAL_REFUNDS = [
  {
    id: "REF-2026-01",
    invoiceId: "INV-2026-488",
    invoiceNo: "INV-488",
    patientId: "PAT-1005",
    patientName: "Vikram Rathore",
    date: "2026-10-07",
    amount: 350,
    originalAmount: 700,
    reason: "Duplicate test booked in error (Cancelled Urine R/M)",
    paymentMethod: "UPI Reversal",
    processedBy: "Amit Verma (Accountant)",
    status: "Approved & Refunded"
  }
];

export const INITIAL_LAB_QC = [
  {
    id: "QC-2026-901",
    date: "2026-10-10",
    analyzer: "Sysmex KX-21 Hematology 3-Part Counter",
    controlLevel: "Normal Control (Level 2)",
    lotNumber: "SYS-QC-2026-N",
    parametersTested: [
      { parameter: "WBC", target: "7.5", observed: "7.4", unit: "10^3/uL", status: "In Range" },
      { parameter: "RBC", target: "4.60", observed: "4.58", unit: "10^6/uL", status: "In Range" },
      { parameter: "HGB", target: "13.5", observed: "13.4", unit: "g/dL", status: "In Range" },
      { parameter: "PLT", target: "240", observed: "238", unit: "10^3/uL", status: "In Range" }
    ],
    technician: "Rahul Jain",
    reviewedBy: "Kavita Sharma (Lab Manager)",
    overallStatus: "Passed (100% In Range)"
  },
  {
    id: "QC-2026-902",
    date: "2026-10-10",
    analyzer: "Erba Chem-7 Semi-Automated Clinical Chemistry",
    controlLevel: "Pathological Control (Level 3)",
    lotNumber: "ERBA-BIO-HIGH-88",
    parametersTested: [
      { parameter: "Glucose", target: "240", observed: "243", unit: "mg/dL", status: "In Range" },
      { parameter: "SGOT / AST", target: "120", observed: "118", unit: "U/L", status: "In Range" },
      { parameter: "Creatinine", target: "3.8", observed: "3.75", unit: "mg/dL", status: "In Range" }
    ],
    technician: "Rahul Jain",
    reviewedBy: "Kavita Sharma (Lab Manager)",
    overallStatus: "Passed (100% In Range)"
  }
];

