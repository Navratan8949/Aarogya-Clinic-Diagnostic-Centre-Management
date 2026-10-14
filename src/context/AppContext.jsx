import { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_FACILITY,
  INITIAL_ROLES,
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_TEST_CATALOGUE,
  INITIAL_PACKAGES,
  INITIAL_APPOINTMENTS,
  INITIAL_VISITS,
  INITIAL_LAB_ORDERS,
  INITIAL_REPORTS,
  INITIAL_INVOICES,
  INITIAL_INVENTORY,
  INITIAL_SUPPLIERS,
  INITIAL_EXPENSES,
  INITIAL_FOLLOWUPS,
  INITIAL_NOTIFICATIONS,
  INITIAL_STAFF,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_CRITICAL_RESULTS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_REFUNDS,
  INITIAL_LAB_QC
} from '../data/initialData.js';
import { CLINIC_DEMO_USERS } from '../components/auth/clinicDemoUsers.js';
import { generateId } from '../lib/formatters.js';

const AppContext = createContext(null);

const STORAGE_KEY_PREFIX = 'aarogyadesk_v1_';

export function AppProvider({ children }) {
  // Navigation & View state - defaults to landing page as requested, can jump into app with 1 click
  const [currentView, setCurrentView] = useState('landing');
  const [activeTabSubView, setActiveTabSubView] = useState('overview');
  const [currentRole, setCurrentRole] = useState(INITIAL_ROLES[0]); // default Super Admin
  const [currentBranch, setCurrentBranch] = useState(INITIAL_FACILITY.branches[0]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const auth = localStorage.getItem(STORAGE_KEY_PREFIX + 'auth_state');
        if (auth !== null) return auth === 'true';
      } catch (e) {}
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem(STORAGE_KEY_PREFIX + 'auth_user');
        if (user) return JSON.parse(user);
      } catch (e) {}
    }
    return CLINIC_DEMO_USERS[0];
  });

  // In-app Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to load or initialize from localStorage
  const loadState = (key, fallback) => {
    if (typeof window === 'undefined') return fallback;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Failed to parse localStorage key ${key}`, e);
      return fallback;
    }
  };

  // Main Entities State
  const [patients, setPatients] = useState(() => loadState('patients', INITIAL_PATIENTS));
  const [doctors, setDoctors] = useState(() => loadState('doctors', INITIAL_DOCTORS));
  const [appointments, setAppointments] = useState(() => loadState('appointments', INITIAL_APPOINTMENTS));
  const [visits, setVisits] = useState(() => loadState('visits', INITIAL_VISITS));
  const [testCatalogue, setTestCatalogue] = useState(() => loadState('tests', INITIAL_TEST_CATALOGUE));
  const [packages, setPackages] = useState(() => loadState('packages', INITIAL_PACKAGES));
  const [labOrders, setLabOrders] = useState(() => loadState('labOrders', INITIAL_LAB_ORDERS));
  const [reports, setReports] = useState(() => loadState('reports', INITIAL_REPORTS));
  const [invoices, setInvoices] = useState(() => loadState('invoices', INITIAL_INVOICES));
  const [inventory, setInventory] = useState(() => loadState('inventory', INITIAL_INVENTORY));
  const [suppliers, setSuppliers] = useState(() => loadState('suppliers', INITIAL_SUPPLIERS));
  const [expenses, setExpenses] = useState(() => loadState('expenses', INITIAL_EXPENSES));
  const [followups, setFollowups] = useState(() => loadState('followups', INITIAL_FOLLOWUPS));
  const [notifications, setNotifications] = useState(() => loadState('notifications', INITIAL_NOTIFICATIONS));
  const [staff, setStaff] = useState(() => loadState('staff', INITIAL_STAFF));
  const [activityLogs, setActivityLogs] = useState(() => loadState('activityLogs', INITIAL_ACTIVITY_LOGS));
  const [criticalResults, setCriticalResults] = useState(() => loadState('criticalResults', INITIAL_CRITICAL_RESULTS));
  const [purchaseOrders, setPurchaseOrders] = useState(() => loadState('purchaseOrders', INITIAL_PURCHASE_ORDERS));
  const [refunds, setRefunds] = useState(() => loadState('refunds', INITIAL_REFUNDS));
  const [labQC, setLabQC] = useState(() => loadState('labQC', INITIAL_LAB_QC));

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'activityLogs', JSON.stringify(activityLogs));
    } catch {}
  }, [activityLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'criticalResults', JSON.stringify(criticalResults));
    } catch {}
  }, [criticalResults]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'purchaseOrders', JSON.stringify(purchaseOrders));
    } catch {}
  }, [purchaseOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'refunds', JSON.stringify(refunds));
    } catch {}
  }, [refunds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'labQC', JSON.stringify(labQC));
    } catch {}
  }, [labQC]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'patients', JSON.stringify(patients));
    } catch {}
  }, [patients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'appointments', JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'visits', JSON.stringify(visits));
    } catch {}
  }, [visits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'labOrders', JSON.stringify(labOrders));
    } catch {}
  }, [labOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'reports', JSON.stringify(reports));
    } catch {}
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'invoices', JSON.stringify(invoices));
    } catch {}
  }, [invoices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'inventory', JSON.stringify(inventory));
    } catch {}
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'expenses', JSON.stringify(expenses));
    } catch {}
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'followups', JSON.stringify(followups));
    } catch {}
  }, [followups]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  // Role permissions checking
  const canAccessModule = (moduleName) => {
    if (!currentRole) return false;
    if (currentRole.modules.includes('all')) return true;
    return currentRole.modules.includes(moduleName);
  };

  // Authentication & Role Switching
  const login = (credentialsOrUser) => {
    let matchedUser = null;
    if (typeof credentialsOrUser === 'string') {
      matchedUser = CLINIC_DEMO_USERS.find(
        u => u.roleId === credentialsOrUser || u.email.toLowerCase() === credentialsOrUser.toLowerCase()
      ) || CLINIC_DEMO_USERS[0];
    } else if (credentialsOrUser && credentialsOrUser.roleId) {
      matchedUser = credentialsOrUser;
    } else if (credentialsOrUser && credentialsOrUser.email) {
      matchedUser = CLINIC_DEMO_USERS.find(
        u => u.email.toLowerCase() === credentialsOrUser.email.toLowerCase()
      );
      if (!matchedUser) {
        matchedUser = {
          id: `user-${Date.now()}`,
          name: credentialsOrUser.email.split('@')[0].toUpperCase(),
          roleId: currentRole?.id || 'super_admin',
          roleName: 'Hospital Staff',
          email: credentialsOrUser.email,
          avatar: credentialsOrUser.email.slice(0, 2).toUpperCase(),
          badge: 'Clinical Staff',
          department: 'Jaipur Main Facility',
          accessLevel: 'Standard Access'
        };
      }
    } else {
      matchedUser = CLINIC_DEMO_USERS[0];
    }

    setIsAuthenticated(true);
    setCurrentUser(matchedUser);

    const roleObj = INITIAL_ROLES.find(r => r.id === matchedUser.roleId) || INITIAL_ROLES[0];
    setCurrentRole(roleObj);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + 'auth_state', 'true');
        localStorage.setItem(STORAGE_KEY_PREFIX + 'auth_user', JSON.stringify(matchedUser));
      } catch (e) {}
    }

    addToast('Signed In', `Welcome, ${matchedUser.name}! (${matchedUser.roleName})`, 'success');
    return matchedUser;
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + 'auth_state', 'false');
      } catch (e) {}
    }
    addToast('Signed Out', 'You have been signed out from AarogyaDesk', 'info');
  };

  const switchRole = (roleId) => {
    const roleObj = INITIAL_ROLES.find(r => r.id === roleId);
    if (roleObj) {
      setCurrentRole(roleObj);
      const matchedUser = CLINIC_DEMO_USERS.find(u => u.roleId === roleId);
      if (matchedUser) {
        setCurrentUser(matchedUser);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(STORAGE_KEY_PREFIX + 'auth_user', JSON.stringify(matchedUser));
          } catch (e) {}
        }
      }
      addToast('Role Switched', `Now operating as ${roleObj.name} (${roleObj.user})`, 'info');
      if (roleObj.id === 'patient_portal') {
        setCurrentView('portal');
      } else if (currentView === 'portal') {
        setCurrentView('dashboard');
      }
    }
  };

  // Duplicate patient checking
  const checkDuplicatePatient = (name, phone) => {
    const cleanPhone = (phone || '').replace(/\D/g, '');
    const cleanName = (name || '').trim().toLowerCase();

    return patients.filter(p => {
      const pPhone = (p.phone || '').replace(/\D/g, '');
      const pName = (p.name || '').trim().toLowerCase();
      const phoneMatch = cleanPhone.length > 5 && pPhone.includes(cleanPhone);
      const nameMatch = cleanName.length > 2 && pName === cleanName;
      return phoneMatch || nameMatch;
    });
  };

  // Register patient
  const registerPatient = (patientData) => {
    const nextNum = 1000 + patients.length + 1;
    const newPatient = {
      id: `PAT-${nextNum}`,
      ...patientData,
      registrationDate: new Date().toISOString().slice(0, 10),
      status: 'Active',
      totalVisits: 0,
      outstandingBalance: 0
    };

    setPatients(prev => [newPatient, ...prev]);
    addToast('Patient Registered', `ID: ${newPatient.id} - ${newPatient.name} successfully registered.`, 'success');
    return newPatient;
  };

  const updatePatient = (id, updates) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast('Patient Updated', `Record for ${id} has been saved.`, 'info');
  };

  // Appointment Booking with Doctor conflict check
  const bookAppointment = (data) => {
    // Check doctor conflict: same doctor, same date, same timeSlot
    const conflict = appointments.find(a => 
      a.doctorId === data.doctorId &&
      a.date === data.date &&
      a.timeSlot === data.timeSlot &&
      a.status !== 'Cancelled'
    );

    if (conflict) {
      return {
        success: false,
        conflict: true,
        message: `Conflict detected! ${conflict.doctorName} already has an appointment with ${conflict.patientName} at ${data.timeSlot} on ${data.date}.`
      };
    }

    const nextTokenNum = appointments.filter(a => a.date === data.date).length + 1;
    const newApt = {
      id: `APT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      tokenNumber: `T-0${nextTokenNum}`,
      status: 'Scheduled',
      checkedInTime: null,
      source: 'Front Desk',
      priority: 'Regular',
      paymentStatus: 'Unpaid',
      ...data
    };

    setAppointments(prev => [newApt, ...prev]);

    // Update patient total visits / upcoming
    setPatients(prev => prev.map(p => p.id === data.patientId ? { ...p, upcomingAppointment: newApt.date } : p));

    addToast('Appointment Booked', `Token ${newApt.tokenNumber} for ${newApt.patientName} with ${newApt.doctorName}`, 'success');
    return { success: true, appointment: newApt };
  };

  // Check In Patient to Queue
  const checkInPatient = (appointmentId) => {
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          status: 'Checked In',
          checkedInTime: nowTime
        };
      }
      return a;
    }));

    addToast('Patient Checked In', `Patient has entered the active OPD waiting queue.`, 'info');
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addToast('Status Updated', `Appointment ${id} status changed to ${status}`, 'info');
  };

  // Consultation / Visit
  const saveVisit = (visitData) => {
    const isNew = !visitData.id;
    const visitId = isNew ? `VIS-${Math.floor(900 + Math.random() * 99)}` : visitData.id;
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    const record = {
      ...visitData,
      id: visitId,
      time: visitData.time || nowTime,
      date: visitData.date || new Date().toISOString().slice(0, 10),
      status: visitData.status || 'Completed'
    };

    if (isNew) {
      setVisits(prev => [record, ...prev]);
    } else {
      setVisits(prev => prev.map(v => v.id === visitId ? record : v));
    }

    // Update appointment status if linked
    if (record.appointmentId) {
      setAppointments(prev => prev.map(a => a.id === record.appointmentId ? { ...a, status: 'Completed' } : a));
    }

    // If follow-up date specified, schedule follow-up
    if (record.followupDate) {
      const newFollowup = {
        id: `FOL-${Math.floor(10 + Math.random() * 90)}`,
        patientId: record.patientId,
        patientName: record.patientName,
        phone: patients.find(p => p.id === record.patientId)?.phone || '—',
        doctorId: record.doctorId,
        doctorName: record.doctorName,
        recommendedDate: record.followupDate,
        reason: record.followupNotes || 'Routine consultation follow-up',
        status: 'Upcoming',
        reminderStatus: 'Pending Dispatch',
        lastContactDate: null
      };
      setFollowups(prev => [newFollowup, ...prev]);
    }

    addToast('Consultation Saved', `Clinical records for ${record.patientName} saved successfully.`, 'success');
    return record;
  };

  // Lab Orders
  const createLabOrder = (orderData) => {
    const orderNoNum = Math.floor(80 + Math.random() * 50);
    const orderId = `LBO-2026-0${orderNoNum}`;
    const now = new Date();

    // Generate barcoded samples for each test
    const samples = (orderData.testIds || []).map((tId, idx) => {
      const test = testCatalogue.find(t => t.id === tId);
      const sampNum = 8800 + Math.floor(Math.random() * 100) + idx;
      const typeCode = test?.sampleType?.includes('EDTA') ? 'EDTA' : test?.sampleType?.includes('Fluoride') ? 'FL' : 'SST';
      return {
        sampleId: `SMP-${sampNum}`,
        barcode: `AAR-${sampNum}-${typeCode}`,
        testId: tId,
        testName: test?.name || 'Diagnostic Test',
        sampleType: test?.sampleType || 'Serum',
        tube: test?.tubeColor || 'Plain Tube',
        collectionLocation: 'Phlebotomy Counter 1',
        collector: null,
        collectedAt: null,
        status: 'Awaiting Collection',
        notes: ''
      };
    });

    const newOrder = {
      id: orderId,
      orderNo: `LBO-0${orderNoNum}`,
      orderDate: now.toISOString().slice(0, 10),
      orderTime: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'Awaiting Collection',
      priority: orderData.priority || 'Routine',
      samples,
      ...orderData
    };

    setLabOrders(prev => [newOrder, ...prev]);

    // Automatically create invoice for lab order if requested
    if (orderData.generateInvoice) {
      const testItems = (orderData.testIds || []).map(tId => {
        const test = testCatalogue.find(t => t.id === tId);
        return {
          description: test?.name || 'Diagnostic Test',
          type: 'Lab Test',
          qty: 1,
          rate: test?.price || 0,
          amount: test?.price || 0
        };
      });

      const invSubtotal = testItems.reduce((acc, cur) => acc + cur.amount, 0);
      const newInv = {
        id: `INV-2026-${Math.floor(510 + Math.random() * 90)}`,
        invoiceNo: `INV-${Math.floor(510 + Math.random() * 90)}`,
        patientId: orderData.patientId,
        patientName: orderData.patientName,
        date: now.toISOString().slice(0, 10),
        time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        items: testItems,
        subtotal: invSubtotal,
        discountAmount: 0,
        taxPercent: 0,
        taxAmount: 0,
        totalAmount: invSubtotal,
        paidAmount: 0,
        balanceDue: invSubtotal,
        paymentStatus: 'Unpaid',
        payments: []
      };
      setInvoices(prev => [newInv, ...prev]);
    }

    addToast('Lab Order Created', `Order ${orderId} registered with ${samples.length} specimen requirements.`, 'success');
    return newOrder;
  };

  // Sample Collection
  const collectSample = (orderId, sampleId, collectorName = 'Rahul Jain', notes = 'Specimen received in good condition') => {
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const today = new Date().toISOString().slice(0, 10);

    setLabOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const updatedSamples = order.samples.map(s => {
        if (s.sampleId === sampleId) {
          return {
            ...s,
            status: 'Received in Lab',
            collector: collectorName,
            collectedAt: `${today} ${nowTime}`,
            notes
          };
        }
        return s;
      });

      const allCollected = updatedSamples.every(s => s.status !== 'Awaiting Collection');
      return {
        ...order,
        status: allCollected ? 'Sample Collected' : 'Partially Collected',
        samples: updatedSamples
      };
    }));

    addToast('Sample Barcoded & Collected', `Sample ${sampleId} marked as received in laboratory.`, 'success');
  };

  // Sample Rejection
  const rejectSample = (orderId, sampleId, reason) => {
    setLabOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const updatedSamples = order.samples.map(s => {
        if (s.sampleId === sampleId) {
          return {
            ...s,
            status: 'Rejected',
            rejectionReason: reason,
            rejectionTimestamp: new Date().toLocaleString('en-IN')
          };
        }
        return s;
      });
      return {
        ...order,
        status: 'Sample Rejected',
        samples: updatedSamples
      };
    }));

    addToast('Sample Rejected', `Sample ${sampleId} rejected. Reason: ${reason}. Recollection order flagged.`, 'error');
  };

  // Enter Lab Results & Submit for Review
  const enterLabResults = (orderId, resultsData) => {
    const order = labOrders.find(o => o.id === orderId);
    if (!order) return;

    const reportId = `REP-2026-${Math.floor(310 + Math.random() * 80)}`;
    const patient = patients.find(p => p.id === order.patientId);

    const newReport = {
      id: reportId,
      orderId: order.id,
      patientId: order.patientId,
      patientName: order.patientName,
      patientAge: patient?.age || 40,
      patientGender: patient?.gender || 'Unknown',
      doctorName: order.doctorName,
      reportedAt: new Date().toLocaleString('en-IN'),
      verifiedBy: null,
      pathologistRegNo: null,
      status: 'Awaiting Review',
      disclaimer: 'DEMONSTRATION REPORT — NOT FOR CLINICAL USE',
      testResults: resultsData
    };

    setReports(prev => [newReport, ...prev]);

    setLabOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'Awaiting Review',
      reportId: reportId,
      samples: o.samples.map(s => ({ ...s, status: 'Results Entered' }))
    } : o));

    addToast('Results Submitted', `Results entered and submitted to Pathologist queue for review.`, 'info');
  };

  // Review and Authorize Report (Pathologist role)
  const reviewAndApproveReport = (reportId, pathologistName = 'Dr. Rajesh Khandelwal, MD (Pathology)', remarks = 'Results clinically verified and authorized.') => {
    setReports(prev => prev.map(r => {
      if (r.id !== reportId) return r;
      return {
        ...r,
        status: 'Approved',
        verifiedBy: pathologistName,
        pathologistRegNo: 'RMC-18290',
        authorizedAt: new Date().toLocaleString('en-IN'),
        pathologistRemarks: remarks
      };
    }));

    setLabOrders(prev => prev.map(o => o.reportId === reportId ? { ...o, status: 'Approved' } : o));

    addToast('Report Verified & Signed', `Report ${reportId} authorized by ${pathologistName}. Ready for release.`, 'success');
  };

  // Release Report to Patient
  const releaseLabReport = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'Released' } : r));
    setLabOrders(prev => prev.map(o => o.reportId === reportId ? { ...o, status: 'Report Released' } : o));

    addToast('Report Released', `Report ${reportId} is now accessible to the patient and clinician.`, 'success');
  };

  // Billing & Invoices
  const createInvoice = (invData) => {
    const invId = `INV-2026-${Math.floor(520 + Math.random() * 80)}`;
    const now = new Date();
    
    const subtotal = (invData.items || []).reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const discount = Number(invData.discountAmount || 0);
    const total = Math.max(0, subtotal - discount);

    const newInvoice = {
      id: invId,
      invoiceNo: invId,
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      items: invData.items || [],
      subtotal,
      discountAmount: discount,
      discountReason: invData.discountReason || '',
      taxPercent: 0,
      taxAmount: 0,
      totalAmount: total,
      paidAmount: 0,
      balanceDue: total,
      paymentStatus: 'Unpaid',
      payments: [],
      patientId: invData.patientId,
      patientName: invData.patientName
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Update patient outstanding balance
    setPatients(prev => prev.map(p => p.id === invData.patientId ? {
      ...p,
      outstandingBalance: (p.outstandingBalance || 0) + total
    } : p));

    addToast('Invoice Created', `Invoice ${invId} generated for ${invData.patientName}: ₹${total}`, 'success');
    return newInvoice;
  };

  // Record Payment (supports partial payments)
  const recordPayment = (invoiceId, paymentData) => {
    const paymentId = `PAY-${Math.floor(910 + Math.random() * 89)}`;
    const now = new Date();

    setInvoices(prev => prev.map(inv => {
      if (inv.id !== invoiceId) return inv;

      const newPaid = Number(inv.paidAmount || 0) + Number(paymentData.amount);
      const newBal = Math.max(0, inv.totalAmount - newPaid);
      const status = newBal === 0 ? 'Paid' : newPaid > 0 ? 'Partial' : 'Unpaid';

      const newPaymentRecord = {
        paymentId,
        date: now.toISOString().slice(0, 10),
        amount: Number(paymentData.amount),
        method: paymentData.method || 'Cash',
        reference: paymentData.reference || `TXN-${Date.now().toString().slice(-6)}`,
        cashier: paymentData.cashier || currentRole.user
      };

      // Also adjust patient balance
      setPatients(pts => pts.map(p => p.id === inv.patientId ? {
        ...p,
        outstandingBalance: Math.max(0, (p.outstandingBalance || 0) - Number(paymentData.amount))
      } : p));

      return {
        ...inv,
        paidAmount: newPaid,
        balanceDue: newBal,
        paymentStatus: status,
        payments: [...(inv.payments || []), newPaymentRecord]
      };
    }));

    addToast('Payment Recorded', `Receipt generated for ₹${paymentData.amount} via ${paymentData.method}`, 'success');
  };

  // Inventory Management
  const recordStockReceipt = (receiptData) => {
    setInventory(prev => prev.map(item => {
      if (item.id === receiptData.itemId) {
        const newQty = item.currentStock + Number(receiptData.quantity);
        return {
          ...item,
          currentStock: newQty,
          batchNo: receiptData.batchNo || item.batchNo,
          expiryDate: receiptData.expiryDate || item.expiryDate,
          status: newQty <= item.minStock ? 'Low Stock' : 'Adequate'
        };
      }
      return item;
    }));

    addToast('Stock Received', `Added ${receiptData.quantity} units to inventory.`, 'success');
  };

  const issueStock = (issueData) => {
    setInventory(prev => prev.map(item => {
      if (item.id === issueData.itemId) {
        const newQty = Math.max(0, item.currentStock - Number(issueData.quantity));
        return {
          ...item,
          currentStock: newQty,
          status: newQty <= item.minStock ? 'Low Stock' : 'Adequate'
        };
      }
      return item;
    }));

    addToast('Stock Issued', `Issued ${issueData.quantity} units to ${issueData.department}.`, 'info');
  };

  // Expenses
  const addExpense = (expData) => {
    const expId = `EXP-2026-${Math.floor(105 + Math.random() * 90)}`;
    const newExp = {
      id: expId,
      date: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      approvedBy: currentRole.user,
      ...expData,
      amount: Number(expData.amount)
    };

    setExpenses(prev => [newExp, ...prev]);
    addToast('Expense Logged', `₹${newExp.amount} for ${newExp.category} recorded.`, 'info');
  };

  // Follow-up Communication Simulation
  const sendSimulatedReminder = (followupId, channel = 'WhatsApp') => {
    const nowStr = new Date().toLocaleString('en-IN');
    setFollowups(prev => prev.map(f => {
      if (f.id === followupId) {
        return {
          ...f,
          reminderStatus: `Sent via ${channel} Simulation`,
          lastContactDate: nowStr
        };
      }
      return f;
    }));

    addToast('Simulated Message Sent', `Patient reminder dispatched via ${channel} (Demo mode notification logged)`, 'success');
  };

  // Activity Logger
  const logActivity = (action, recordType, recordId, summary) => {
    const newLog = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      user: currentRole?.user || "System User",
      role: currentRole?.name || "Staff",
      action,
      recordType,
      recordId,
      timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      summary
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Critical Results Handling
  const acknowledgeCriticalResult = (critId, contactedPerson, method, note) => {
    const timeStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    setCriticalResults(prev => prev.map(cr => {
      if (cr.id === critId) {
        return {
          ...cr,
          status: 'Escalated to Doctor',
          contactLogs: [
            ...(cr.contactLogs || []),
            { timestamp: timeStr, contactedPerson, method, note }
          ]
        };
      }
      return cr;
    }));
    logActivity('Critical Value Escalated', 'Laboratory', critId, `Contacted ${contactedPerson} via ${method}`);
    addToast('Critical Alert Acknowledged', `Escalation log recorded for doctor notification.`, 'info');
  };

  const closeCriticalResult = (critId, closureNote) => {
    setCriticalResults(prev => prev.map(cr => {
      if (cr.id === critId) {
        return {
          ...cr,
          status: 'Resolved & Closed',
          closureNote
        };
      }
      return cr;
    }));
    logActivity('Critical Alert Closed', 'Laboratory', critId, closureNote);
    addToast('Critical Value Closed', `Investigation case marked resolved.`, 'success');
  };

  // Purchase Order
  const createPurchaseOrder = (poData) => {
    const poNumber = `PO-${Math.floor(100 + Math.random() * 900)}`;
    const newPO = {
      id: poNumber,
      poNumber,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'Placed / Awaiting Delivery',
      ...poData
    };
    setPurchaseOrders(prev => [newPO, ...prev]);
    logActivity('Purchase Order Created', 'Inventory', poNumber, `PO issued to ${poData.supplierName} for ₹${poData.totalAmount}`);
    addToast('Purchase Order Issued', `PO #${poNumber} generated successfully.`, 'success');
    return newPO;
  };

  // Refunds
  const processRefund = (invoiceId, refundData) => {
    const refId = `REF-2026-${Math.floor(10 + Math.random() * 89)}`;
    const refundRecord = {
      id: refId,
      invoiceId,
      date: new Date().toISOString().slice(0, 10),
      processedBy: currentRole.user,
      status: 'Approved & Refunded',
      ...refundData
    };

    setRefunds(prev => [refundRecord, ...prev]);

    // Update invoice total and paid amount
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const refundedAmt = Number(refundData.amount);
        return {
          ...inv,
          paidAmount: Math.max(0, inv.paidAmount - refundedAmt),
          paymentStatus: 'Refunded / Adjusted',
          refunds: [...(inv.refunds || []), refundRecord]
        };
      }
      return inv;
    }));

    logActivity('Refund Processed', 'Billing', refId, `₹${refundData.amount} refunded for invoice ${invoiceId}: ${refundData.reason}`);
    addToast('Refund Recorded', `Credit note ${refId} issued for ₹${refundData.amount}`, 'info');
    return refundRecord;
  };

  // Lab Quality Control (QC)
  const recordLabQC = (qcData) => {
    const qcId = `QC-${Date.now().toString().slice(-4)}`;
    const record = {
      id: qcId,
      date: new Date().toISOString().slice(0, 10),
      technician: currentRole.user,
      ...qcData
    };
    setLabQC(prev => [record, ...prev]);
    logActivity('Lab QC Recorded', 'Laboratory QC', qcId, `Ran QC on ${qcData.analyzer} (${qcData.controlLevel})`);
    addToast('QC Logged', `Daily analyzer control recorded: ${qcData.overallStatus}`, 'success');
    return record;
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setPatients(INITIAL_PATIENTS);
    setDoctors(INITIAL_DOCTORS);
    setAppointments(INITIAL_APPOINTMENTS);
    setVisits(INITIAL_VISITS);
    setTestCatalogue(INITIAL_TEST_CATALOGUE);
    setPackages(INITIAL_PACKAGES);
    setLabOrders(INITIAL_LAB_ORDERS);
    setReports(INITIAL_REPORTS);
    setInvoices(INITIAL_INVOICES);
    setInventory(INITIAL_INVENTORY);
    setSuppliers(INITIAL_SUPPLIERS);
    setExpenses(INITIAL_EXPENSES);
    setFollowups(INITIAL_FOLLOWUPS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStaff(INITIAL_STAFF);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setCriticalResults(INITIAL_CRITICAL_RESULTS);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setRefunds(INITIAL_REFUNDS);
    setLabQC(INITIAL_LAB_QC);

    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch {}

    addToast('Demo Reset Completed', 'All clinical, lab, and financial records restored to initial state.', 'info');
  };

  // Global counts & KPIs for dashboard
  const stats = {
    totalPatients: patients.length,
    todayAppointments: appointments.filter(a => a.date === '2026-10-10').length,
    checkedInQueue: appointments.filter(a => a.status === 'Checked In' || a.status === 'Waiting').length,
    inConsultation: appointments.filter(a => a.status === 'In Consultation').length,
    completedConsultations: appointments.filter(a => a.status === 'Completed').length,
    todayLabOrders: labOrders.length,
    samplesAwaitingCollection: labOrders.flatMap(o => o.samples || []).filter(s => s.status === 'Awaiting Collection').length,
    samplesInProcessing: labOrders.flatMap(o => o.samples || []).filter(s => s.status === 'Processing' || s.status === 'Received in Lab').length,
    reportsAwaitingReview: reports.filter(r => r.status === 'Awaiting Review').length,
    reportsReleased: reports.filter(r => r.status === 'Released').length,
    totalRevenue: invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
    totalCollections: invoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0),
    outstandingBalances: invoices.reduce((sum, inv) => sum + (inv.balanceDue || 0), 0),
    pendingFollowups: followups.filter(f => f.status === 'Due Today' || f.status === 'Upcoming').length,
    lowStockItems: inventory.filter(i => i.status === 'Low Stock' || i.status === 'Expiring Soon').length,
    totalExpenses: expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)
  };

  return (
    <AppContext.Provider
      value={{
        facility: INITIAL_FACILITY,
        branches: INITIAL_FACILITY.branches,
        currentBranch,
        setCurrentBranch,
        roles: INITIAL_ROLES,
        currentRole,
        switchRole,
        canAccessModule,
        // Authentication
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        login,
        logout,
        currentView,
        setCurrentView,
        activeTabSubView,
        setActiveTabSubView,
        globalSearch,
        setGlobalSearch,
        selectedPatientId,
        setSelectedPatientId,
        selectedVisitId,
        setSelectedVisitId,
        selectedOrderId,
        setSelectedOrderId,
        selectedReportId,
        setSelectedReportId,
        // Data & collections
        patients,
        doctors,
        appointments,
        visits,
        testCatalogue,
        packages,
        labOrders,
        reports,
        invoices,
        inventory,
        suppliers,
        expenses,
        followups,
        notifications,
        staff,
        activityLogs,
        criticalResults,
        purchaseOrders,
        refunds,
        labQC,
        stats,
        // Actions
        checkDuplicatePatient,
        registerPatient,
        updatePatient,
        bookAppointment,
        checkInPatient,
        updateAppointmentStatus,
        saveVisit,
        createLabOrder,
        collectSample,
        rejectSample,
        enterLabResults,
        reviewAndApproveReport,
        releaseLabReport,
        createInvoice,
        recordPayment,
        recordStockReceipt,
        issueStock,
        addExpense,
        sendSimulatedReminder,
        logActivity,
        acknowledgeCriticalResult,
        closeCriticalResult,
        createPurchaseOrder,
        processRefund,
        recordLabQC,
        resetDemoData,
        // Toasts
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
