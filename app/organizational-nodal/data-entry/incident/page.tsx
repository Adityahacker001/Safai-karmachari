'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  PlusCircle,
  Trash,
  MapPin,
  Upload,
  Save,
  FileDown,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Calendar,
  Globe,
  Building,
  Home,
  Truck,
  Skull,
  HeartPulse,
  Shield,
  Landmark,
  Banknote,
  Send,
  User,
  Hash,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components ---

/**
 * 1. GlassCard Component
 * Reusable card with glassmorphism and border.
 */
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-200/50 ${className}`}
  >
    {children}
  </div>
);

/**
 * 2. FormInputGroup Component
 * Standardized wrapper for form inputs with icon, label, and help text.
 */
const FormInputGroup: React.FC<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}> = ({ label, icon, children, className = '', required = false }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="flex items-center gap-2 mb-1.5 text-sm font-semibold text-navy-800">
      {icon}
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="form-input-wrapper">{children}</div>
  </div>
);

/**
 * 3. AppButton Component
 * Reusable button with variants and motion.
 */
const AppButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'action' | 'destructiveOutline';
  icon?: React.ElementType;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
}> = ({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  className = '',
  type = 'button',
  disabled = false,
  isLoading = false,
}) => {
  const variants = {
    primary:
      'bg-navy-700 text-white hover:bg-navy-800 shadow-lg shadow-blue-500/20',
    secondary: 'bg-gray-200 text-navy-800 hover:bg-gray-300',
    destructive:
      'bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-500/20',
    destructiveOutline:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
    action: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </motion.button>
  );
};

/**
 * 4. Toast Component
 * For success/error messages.
 */
const Toast: React.FC<{
  toast: { type: 'error' | 'success' | 'info'; message: string } | null;
  setToast: (toast: null) => void;
}> = ({ toast, setToast }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast) return null;

  const config = {
    error: {
      icon: <XCircle className="text-red-600" />,
      styles: 'bg-red-50 border-red-200 text-red-800',
    },
    success: {
      icon: <CheckCircle className="text-green-600" />,
      styles: 'bg-green-50 border-green-200 text-green-800',
    },
    info: {
      icon: <Info className="text-blue-600" />,
      styles: 'bg-blue-50 border-blue-200 text-blue-800',
    },
  };

  const { icon, styles } = config[toast.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed right-6 bottom-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${styles}`}
      >
        {icon}
        <span className="font-medium">{toast.message}</span>
        <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">
          <XCircle size={18} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};


// --- Main Page Component ---

export default function IncidentInputPage() {
  const [incidentType, setIncidentType] = useState('Manual Scavenging');
  const [dateTime, setDateTime] = useState('');
  const [locationText, setLocationText] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [ulb, setUlb] = useState('');
  const [description, setDescription] = useState('');
  const [device, setDevice] = useState('');
  const [victims, setVictims] = useState([{ name: '', age: '', gender: '' }]);
  const [ppeProvided, setPpeProvided] = useState(false);
  const [deaths, setDeaths] = useState(0);
  const [injuries, setInjuries] = useState(0);
  const [firFiled, setFirFiled] = useState(false);
  const [firNo, setFirNo] = useState('');
  const [policeStation, setPoliceStation] = useState('');
  const [compensationInitiated, setCompensationInitiated] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toast, setToast] =
    useState<null | { type: 'error' | 'success' | 'info'; message: string }>(
      null,
    );
  
  // --- Form Logic Handlers ---

  function addVictim() {
    setVictims([...victims, { name: '', age: '', gender: '' }]);
  }

  function removeVictim(index: number) {
    setVictims(victims.filter((_, i) => i !== index));
  }

  function updateVictim(
    index: number,
    key: 'name' | 'age' | 'gender',
    value: string,
  ) {
    const copy = [...victims];
    copy[index] = { ...copy[index], [key]: value };
    setVictims(copy);
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    setFiles(fileList);
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setToast({ type: 'error', message: 'Geolocation not supported' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lon = pos.coords.longitude.toFixed(6);
        setLocationText(`${lat}, ${lon}`);
        setToast({ type: 'success', message: 'Location detected' });
      },
      () => setToast({ type: 'error', message: 'Location permission denied' }),
      { timeout: 8000 },
    );
  }

  function validate() {
    if (!dateTime) return 'Please select date & time of incident.';
    if (!locationText) return 'Please provide the location (text or detect).';
    if (!district) return 'Please select district.';
    if (!description) return 'Please add a brief description.';
    return null;
  }
  
  function handleReset() {
    setIncidentType('Manual Scavenging');
    setDateTime('');
    setLocationText('');
    setStateName('');
    setDistrict('');
    setUlb('');
    setDescription('');
    setDevice('');
    setVictims([{ name: '', age: '', gender: '' }]);
    setPpeProvided(false);
    setDeaths(0);
    setInjuries(0);
    setFirFiled(false);
    setFirNo('');
    setPoliceStation('');
    setCompensationInitiated(false);
    setFiles([]);
    setToast({ type: 'info', message: 'Form has been cleared' });
  }

  function buildPayload() {
    return {
      incidentType,
      dateTime,
      locationText,
      stateName,
      district,
      ulb,
      description,
      device,
      victims,
      ppeProvided,
      deaths,
      injuries,
      fir: firFiled ? { firNo, policeStation } : null,
      compensationInitiated,
      attachments: files.map((f) => ({ name: f.name, size: f.size })),
      meta: {
        createdBy: 'OrgNodalUser',
        createdAt: new Date().toISOString(),
      },
    };
  }
  
  async function saveDraft() {
    setSavingDraft(true);
    const draft = buildPayload();
    localStorage.setItem('incident_draft', JSON.stringify(draft));
    setTimeout(() => {
      setSavingDraft(false);
      setToast({ type: 'success', message: 'Draft saved locally' });
    }, 700);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setToast({ type: 'error', message: err });
      return;
    }
    setSubmitting(true);
    const payload = buildPayload();

    console.log('SUBMIT INCIDENT PAYLOAD:', payload);

    setTimeout(() => {
      setSubmitting(false);
      setToast({ type: 'success', message: 'Incident submitted successfully' });
      handleReset(); // Clear form on success
    }, 1200);
  }

  // Try to load draft on mount
  function loadDraft() {
     const raw = localStorage.getItem('incident_draft');
     if (raw) {
       try {
         const d = JSON.parse(raw);
         if (d && d.dateTime) {
           // shallow populate
           setIncidentType(d.incidentType || 'Manual Scavenging');
           setDateTime(d.dateTime || '');
           setLocationText(d.locationText || '');
           setStateName(d.stateName || '');
           setDistrict(d.district || '');
           setUlb(d.ulb || '');
           setDescription(d.description || '');
           setVictims(d.victims || [{ name: '', age: '', gender: '' }]);
           setPpeProvided(d.ppeProvided || false);
           setDeaths(d.deaths || 0);
           setInjuries(d.injuries || 0);
           setFirFiled(d.fir != null);
           setFirNo(d.fir?.firNo || '');
           setPoliceStation(d.fir?.policeStation || '');
           setCompensationInitiated(d.compensationInitiated || false);
           setToast({ type: 'info', message: 'Draft loaded from storage' });
         } else {
           setToast({ type: 'info', message: 'No valid draft found' });
         }
       } catch (e) {
         setToast({ type: 'error', message: 'Could not parse draft' });
       }
     } else {
        setToast({ type: 'info', message: 'No draft found' });
     }
  }

  useEffect(() => {
    // We don't auto-load, we let the user click the button.
    // loadDraft(); 
  }, []);

  return (
    <>
      {/* Background elements */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-gradient-to-br from-white via-blue-50 to-gray-100" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      <div className="max-w-7xl mx-auto p-6">

        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
             <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-navy-700 text-gold-400 shadow-lg shadow-navy-500/30 border-2 border-white/50">
               <AlertCircle size={36} />
             </div>
             <div>
               <h1 className="text-3xl font-bold text-navy-900">Report New Incident</h1>
                <p className="text-base text-gray-600">Organizational Nodal Input Form</p>
             </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <AppButton
              onClick={saveDraft}
              variant="secondary"
              icon={Save}
              isLoading={savingDraft}
              disabled={submitting}
            >
              Save Draft
            </AppButton>
            <AppButton
              onClick={loadDraft}
              variant="secondary"
              icon={FileDown}
              disabled={savingDraft || submitting}
            >
              Load Draft
            </AppButton>
          </div>
        </header>

        <GlassCard className="overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Section 1: Core Details */}
            <section className="p-6 md:p-8">
               <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                 <FileText className="text-blue-500" />
                 1. Incident Details
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInputGroup label="Incident Type" icon={<FileText size={16} />} required>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="form-select"
                  >
                    <option>Manual Scavenging</option>
                    <option>Sewer Injury</option>
                    <option>Hazardous Exposure</option>
                    <option>Other</option>
                  </select>
                </FormInputGroup>

                <FormInputGroup label="Date & Time" icon={<Calendar size={16} />} required>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="form-input"
                  />
                </FormInputGroup>
                
                <FormInputGroup label="Location (Text or Coords)" icon={<MapPin size={16} />} required>
                  <div className="flex gap-2">
                    <input
                      value={locationText}
                      onChange={(e) => setLocationText(e.target.value)}
                      placeholder="e.g., Old Pump House or 22.57, 88.36"
                      className="form-input"
                    />
                    <AppButton type="button" onClick={detectLocation} variant="secondary" className="px-3">
                      <MapPin size={16} />
                    </AppButton>
                  </div>
                </FormInputGroup>
               </div>
            </section>

            {/* Section 2: Location Details */}
            <section className="p-6 md:p-8 bg-blue-50/50 border-y border-blue-100">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <MapPin className="text-blue-500" />
                2. Location & Asset Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormInputGroup label="State" icon={<Globe size={16} />}>
                  <input value={stateName} onChange={(e) => setStateName(e.target.value)} className="form-input" />
                </FormInputGroup>
                <FormInputGroup label="District" icon={<Building size={16} />} required>
                  <input value={district} onChange={(e) => setDistrict(e.target.value)} className="form-input" />
                </FormInputGroup>
                <FormInputGroup label="Municipality / ULB" icon={<Home size={16} />}>
                  <input value={ulb} onChange={(e) => setUlb(e.target.value)} className="form-input" />
                </FormInputGroup>
                <FormInputGroup label="Device / Vehicle (Opt.)" icon={<Truck size={16} />}>
                  <input value={device} onChange={(e) => setDevice(e.target.value)} className="form-input" />
                </FormInputGroup>
              </div>
            </section>

            {/* Section 3: Description & Vitals */}
            <section className="p-6 md:p-8 bg-green-50/50 border-y border-green-100">
               <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                 <HeartPulse className="text-green-500" />
                 3. Description & Vitals
               </h2>
                <FormInputGroup label="Brief Description" icon={<FileText size={16} />} required>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="form-textarea" />
                </FormInputGroup>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                   <FormInputGroup label="Deaths" icon={<Skull size={16} />}>
                     <input type="number" min={0} value={deaths} onChange={(e) => setDeaths(Number(e.target.value))} className="form-input" />
                   </FormInputGroup>
                   <FormInputGroup label="Injuries" icon={<HeartPulse size={16} />}>
                     <input type="number" min={0} value={injuries} onChange={(e) => setInjuries(Number(e.target.value))} className="form-input" />
                   </FormInputGroup>
                   <label className="flex items-center gap-2 mt-10">
                     <input id="ppe" type="checkbox" checked={ppeProvided} onChange={(e) => setPpeProvided(e.target.checked)} className="form-checkbox" />
                     <span className="text-sm font-semibold text-navy-800">PPE Provided?</span>
                   </label>
                </div>
            </section>
            
            {/* Section 4: Victims */}
            <section className="p-6 md:p-8 bg-orange-50/50 border-y border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-navy-900 flex items-center gap-3">
                  <Users className="text-orange-500" />
                  4. Victim(s) / Worker(s) Involved
                </h2>
                <AppButton type="button" onClick={addVictim} icon={PlusCircle} variant="action">
                   Add Victim
                </AppButton>
              </div>
              
              <div className="space-y-3 p-4 bg-orange-100/70 rounded-lg border border-orange-200">
                {victims.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <FormInputGroup label={`Victim ${idx + 1} Name`} icon={<User size={14} />}>
                       <input placeholder="Name" value={v.name} onChange={(e) => updateVictim(idx, 'name', e.target.value)} className="form-input" />
                    </FormInputGroup>
                    <FormInputGroup label="Age" icon={<Hash size={14} />}>
                       <input placeholder="Age" value={v.age} onChange={(e) => updateVictim(idx, 'age', e.target.value)} className="form-input" />
                    </FormInputGroup>
                    <FormInputGroup label="Gender" icon={<Users size={14} />}>
                       <select value={v.gender} onChange={(e) => updateVictim(idx, 'gender', e.target.value)} className="form-select">
                         <option value="">Gender</option>
                         <option>Male</option>
                         <option>Female</option>
                         <option>Other</option>
                       </select>
                    </FormInputGroup>
                    <AppButton type="button" onClick={() => removeVictim(idx)} icon={Trash} variant="destructiveOutline" className="mb-1">
                      Remove
                    </AppButton>
                  </div>
                ))}
                {victims.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-2">No victims added.</p>
                )}
              </div>
            </section>

            {/* Section 5: Legal & Compensation */}
             <section className="p-6 md:p-8 bg-purple-50/50 border-y border-purple-100">
                <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                  <Shield className="text-purple-500" />
                  5. Legal & Compensation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInputGroup label="FIR Filed?" icon={<Shield size={16} />}>
                    <select value={firFiled ? 'yes' : 'no'} onChange={(e) => setFirFiled(e.target.value === 'yes')} className="form-select">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </FormInputGroup>

                  <FormInputGroup label="Compensation Initiated?" icon={<Banknote size={16} />}>
                    <select value={compensationInitiated ? 'yes' : 'no'} onChange={(e) => setCompensationInitiated(e.target.value === 'yes')} className="form-select">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </FormInputGroup>
                </div>

                {firFiled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormInputGroup label="FIR No" icon={<FileText size={16} />}>
                      <input value={firNo} onChange={(e) => setFirNo(e.target.value)} className="form-input" />
                    </FormInputGroup>
                    <FormInputGroup label="Police Station" icon={<Landmark size={16} />}>
                      <input value={policeStation} onChange={(e) => setPoliceStation(e.target.value)} className="form-input" />
                    </FormInputGroup>
                  </div>
                )}
            </section>

            {/* Section 6: Attachments */}
            <section className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-100">
              <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <Upload className="text-gray-500" />
                6. Attachments
              </h2>
              <FormInputGroup label="Upload (Photos, MLC, FIR Copy)" icon={<Upload size={16} />}>
                <input 
                  onChange={handleFiles} 
                  multiple 
                  type="file" 
                  className="form-file-input"
                />
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  {files.length > 0 ? (
                     files.map((f) => (
                       <div key={f.name} className="flex items-center gap-2">
                         <FileText size={14} className="text-blue-500" />
                         <span>{f.name} — {(f.size / 1024).toFixed(1)} KB</span>
                       </div>
                     ))
                  ) : (
                     <div className="flex items-center gap-2 text-gray-500">
                       <Upload size={14} /> No files selected
                     </div>
                  )}
                </div>
              </FormInputGroup>
            </section>

            {/* Footer */}
            <footer className="p-6 md:p-8 flex items-center justify-between border-t border-gray-200/80 bg-white">
              <div className="text-sm text-gray-600">
                Fields marked <span className="text-red-500">*</span> are mandatory
              </div>
              <div className="flex gap-3">
                <AppButton type="button" onClick={handleReset} variant="secondary">
                  Reset Form
                </AppButton>
                <AppButton
                  type="submit"
                  disabled={submitting || savingDraft}
                  isLoading={submitting}
                  icon={Send}
                  variant="primary"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit Incident
                </AppButton>
              </div>
            </footer>
          </form>
        </GlassCard>

        {/* Toast Component */}
        <Toast toast={toast} setToast={setToast} />
      </div>

      {/* Global Styles for Form Elements */}
      <style jsx global>{`
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.65rem 0.9rem;
          font-size: 0.9rem;
          font-family: inherit;
          border-radius: 0.5rem; /* rounded-lg */
          border: 1px solid #cbd5e1; /* slate-300 */
          background-color: #ffffff;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #2563eb; /* blue-600 */
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.7rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        .form-checkbox {
          height: 1.25rem;
          width: 1.25rem;
          border-radius: 0.375rem;
          border-color: #cbd5e1;
          color: #2563eb;
          transition: all 0.2s;
        }
        .form-checkbox:focus {
           outline: none;
           box-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
           border-color: #2563eb;
        }
        
        .form-file-input {
          font-size: 0.9rem;
          color: #475569; /* slate-600 */
        }
        
        .form-file-input::file-selector-button {
          margin-right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 0;
          font-size: 0.875rem;
          font-weight: 600;
          background-color: #e0f2fe; /* blue-50 */
          color: #0284c7; /* blue-700 */
          transition: background-color 0.2s;
          cursor: pointer;
        }
        
        .form-file-input::file-selector-button:hover {
          background-color: #bae6fd; /* blue-200 */
        }
      `}</style>
    </>
  );
}

