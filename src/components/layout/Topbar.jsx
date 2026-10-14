import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  Menu,
  Search,
  Plus,
  Bell,
  User,
  CheckCircle,
  AlertTriangle,
  Clock,
  FlaskConical,
  Receipt,
  UserPlus,
  CalendarPlus,
  X,
  LogOut,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';

export default function Topbar({ onMenuClick, onOpenQuickAction }) {
  const navigate = useNavigate();
  const {
    facility,
    currentRole,
    currentUser,
    logout,
    roles,
    switchRole,
    patients,
    notifications,
    setCurrentView,
    setSelectedPatientId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  const notifRef = useRef(null);
  const quickRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (quickRef.current && !quickRef.current.contains(e.target)) {
        setIsQuickOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifs = notifications.filter(n => !n.read);

  // Search matches
  const searchResults = searchQuery.trim()
    ? patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200/90 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30 shadow-xs shrink-0">
      {/* Left: Mobile Toggle & Facility Info */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onMenuClick}
          className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden cursor-pointer"
          aria-label="Open Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-sm font-bold text-slate-900 leading-tight">{facility.name}</h2>
          <p className="text-[11px] text-slate-500 font-medium">Jaipur, Rajasthan • OPD & Diagnostics</p>
        </div>
      </div>

      {/* Middle: Responsive Global Search */}
      <div className="flex-1 max-w-md relative min-w-0 mx-1 sm:mx-0" ref={searchRef}>
        <div className="relative">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search patient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 rounded-lg border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 max-h-80 overflow-y-auto animate-in fade-in duration-100">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Patients Found ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <div className="px-4 py-3 text-xs text-slate-500 text-center">
                No matching patient found for "{searchQuery}"
              </div>
            ) : (
              searchResults.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setCurrentView('patients');
                    setIsSearchFocused(false);
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-2 hover:bg-teal-50/60 cursor-pointer flex items-center justify-between text-xs border-b border-slate-50 last:border-0"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{p.phone} • ID: {p.id}</div>
                  </div>
                  <span className="text-[10px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">
                    Open →
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right: Quick Create, Notifications, Profile */}
      <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
        {/* Quick Action Button */}
        <div className="relative" ref={quickRef}>
          <button
            onClick={() => setIsQuickOpen(!isQuickOpen)}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-colors cursor-pointer shrink-0"
            title="Quick Action"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Quick Action</span>
          </button>

          {isQuickOpen && (
            <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1.5rem)] bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in duration-100">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Create Record
              </div>
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenQuickAction('register_patient');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-teal-600" />
                <span>Register New Patient</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenQuickAction('book_appointment');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-blue-600" />
                <span>Book Appointment</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenQuickAction('create_lab_order');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer"
              >
                <FlaskConical className="w-4 h-4 text-indigo-600" />
                <span>Create Lab Requisition</span>
              </button>
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenQuickAction('create_invoice');
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700 font-medium cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>Generate Invoice</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative transition-colors cursor-pointer shrink-0"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">Notifications</span>
                <span className="text-[11px] text-teal-700 font-semibold">{unreadNotifs.length} new</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.link) setCurrentView(n.link);
                      setIsNotifOpen(false);
                    }}
                    className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                      !n.read ? 'bg-teal-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-semibold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Public Landing Site Link (desktop) */}
        <button
          onClick={() => navigate('/')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
          title="Return to Public Website"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>Public Site</span>
        </button>

        {/* Interactive User Profile & Role Switcher */}
        <div className="relative pl-0.5 sm:pl-1 border-l border-slate-200" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-left shrink-0"
            title="User Profile & Role Switcher"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              {currentUser?.avatar || 'AS'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.name || currentRole.user.split(' ')[0]}
              </p>
              <p className="text-[10px] text-slate-500">{currentRole.name}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95">
              {/* Profile Card Header */}
              <div className="p-3 sm:p-3.5 border-b border-slate-100 bg-slate-50/80 rounded-t-2xl">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                    {currentUser?.avatar || 'AS'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 text-xs truncate">
                      {currentUser?.name || currentRole.user}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {currentUser?.email || 'staff@aarogyadesk-demo.in'}
                    </div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      {currentRole.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Roles Subheader */}
              <div className="px-3.5 py-1.5 bg-slate-100/70 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Switch Operational Persona</span>
                <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">1-Click</span>
              </div>

              {/* Roles List */}
              <div className="max-h-52 overflow-y-auto py-1">
                {roles.map(r => {
                  const isSelected = r.id === currentRole.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRole(r.id);
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 flex items-start gap-2.5 hover:bg-teal-50/60 transition-colors cursor-pointer ${
                        isSelected ? 'bg-teal-50/90 text-teal-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSelected ? (
                          <Check className="w-4 h-4 text-teal-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{r.name}</div>
                        <div className="text-[10px] text-slate-400 truncate leading-tight">{r.user}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Logout Action Bar */}
              <div className="p-2 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2 px-3 flex items-center justify-center gap-2 rounded-xl text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 transition-all shadow-xs cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Healthcare Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
