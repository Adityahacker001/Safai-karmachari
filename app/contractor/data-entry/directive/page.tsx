'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import DataTable from '@/components/ui/data-table';
import StatCard from '@/components/ui/stat-card';
import { FileText, Send, Inbox, Plus, X } from 'lucide-react';
import IntegratedLoader from '@/components/layout/IntegratedLoader';

interface AttachmentItem {
  name: string;
  url?: string;
  type?: string;
}

interface Directive {
  directiveId: string;
  from?: string;
  to?: string;
  subject: string;
  date: string;
  status: string;
  priority: string;
  attachments?: Array<string | AttachmentItem>;
  remarks?: string[];
}

const Directives = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedDirective, setSelectedDirective] = useState<Directive | null>(null);
  const [showRemarksBox, setShowRemarksBox] = useState(false);
  const [newRemark, setNewRemark] = useState('');
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const receivedDirectives = [
    {
      directiveId: 'DIR-2024-001',
      from: 'Nodal Officer (District A)',
      subject: 'PPE Distribution Protocol Update',
      date: '2024-01-20',
      status: 'Active',
      priority: 'High',
      attachments: [],
      remarks: [],
    },
    {
      directiveId: 'DIR-2024-002',
      from: 'Nodal Officer (State Health)',
      subject: 'Health Checkup Schedule',
      date: '2024-01-18',
      status: 'Completed',
      priority: 'Medium',
      attachments: [],
      remarks: [],
    },
    {
      directiveId: 'DIR-2024-003',
      from: 'Nodal Officer (District B)',
      subject: 'Training Program Implementation',
      date: '2024-01-15',
      status: 'Pending',
      priority: 'Medium',
      attachments: [],
      remarks: [],
    },
  ];

  const [directives, setDirectives] = useState<Directive[]>(receivedDirectives);

  const receivedColumns = [
    { key: 'directiveId', header: 'Directive ID' },
    { key: 'from', header: 'From' },
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' },
    {
      key: 'priority',
      header: 'Priority',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'High' ? 'bg-red-200 text-red-800' :
          value === 'Medium' ? 'bg-yellow-200 text-yellow-900' :
          'bg-green-200 text-green-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-blue-200 text-blue-800' :
          value === 'Completed' ? 'bg-green-200 text-green-800' :
          'bg-yellow-200 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  if (loading) {
    return <IntegratedLoader />;
  }

  return (
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 min-h-screen">
      {/* Enhanced Header */}
      <header className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 rounded-xl sm:rounded-2xl"></div>
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight">
            Directives Management
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-bold drop-shadow-lg">
            Track directives received from Nodal Officers
          </p>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-4">
          {/* <button
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" />
            Issue New Directive
          </button> */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 relative">
                <div className="-mx-8 -mt-8 mb-8 rounded-t-2xl px-8 py-4" style={{background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)'}}>
                  <h2 className="text-2xl font-bold text-black text-center">Issue New Directive</h2>
                </div>
                <form className="space-y-5" onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const fd = new FormData(form);
                  const title = (fd.get('title') as string) || 'Untitled Directive';
                  const message = (fd.get('message') as string) || '';
                  const priority = (fd.get('priority') as string) || 'Medium';

                  // create attachment items (object URLs for preview)
                  const attachments: AttachmentItem[] = attachmentFiles.map((f) => ({
                    name: f.name,
                    type: f.type,
                    url: URL.createObjectURL(f),
                  }));

                  const newDirective: Directive = {
                    directiveId: `DIR-${Date.now()}`,
                    from: 'You',
                    subject: title,
                    date: new Date().toISOString().slice(0,10),
                    status: 'Active',
                    priority,
                    attachments: attachments,
                    remarks: message ? [message] : [],
                  };

                  setDirectives((prev) => [newDirective, ...prev]);
                  setAttachmentFiles([]);
                  setShowModal(false);
                  // open the newly created directive so attachments are visible immediately
                  setSelectedDirective(newDirective);
                }}>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Recipients</label>
                    <select name="recipients" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option>All Nodal Officers</option>
                      <option>District Admin</option>
                      <option>State Health Department</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input name="title" type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter directive title" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Message</label>
                    <textarea name="message" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" rows={4} placeholder="Enter directive message" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Priority</label>
                    <select name="priority" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                      <option>High</option>
                      <option defaultChecked>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Attach Proof (PDF or Photo)</label>
                    <input
                      name="attachments"
                      type="file"
                      accept=".pdf,image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files ? Array.from(e.target.files) : [];
                        setAttachmentFiles(files);
                      }}
                      className="w-full"
                    />
                    {attachmentFiles.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {attachmentFiles.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                            {f.type.startsWith('image') ? (
                              <img src={URL.createObjectURL(f)} alt={f.name} className="h-12 w-12 object-cover rounded" />
                            ) : (
                              <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded text-sm">PDF</div>
                            )}
                            <div className="text-sm text-gray-700">{f.name}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" className="px-5 py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow hover:from-blue-500 hover:to-blue-700">Send Directive</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <StatCard
          title="Received Directives"
          value={receivedDirectives.length}
          subtitle={`Active: ${receivedDirectives.filter(d => d.status === 'Active').length}`}
          icon={Inbox}
          color="sky"
        />

        <StatCard
          title="High Priority Received"
          value={receivedDirectives.filter(d => d.priority === 'High').length}
          subtitle="Requiring attention"
          icon={FileText}
          color="amber"
        />
      </div>

      {/* Table */}
      <div className="bg-white/95 backdrop-blur-xl shadow-xl border border-white/20 rounded-3xl overflow-hidden">
        <div className="border-b border-gray-200/20 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white">
          <div className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3">
              <Inbox className="h-5 w-5 sm:h-6 sm:w-6" />
              Directives Received from Nodal Officer
            </h2>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6">
            <DataTable
              title="Received Directives"
              columns={receivedColumns}
              data={directives}
              actions={true}
              onView={(row: Directive) => {
                // Open modal with full directive details
                setSelectedDirective(row);
                setShowRemarksBox(false);
                setNewRemark('');
              }}
            />
            {/* Directive modal removed from card; rendered at page root to float above everything */}
        </div>
      </div>
      {/* Root-level Directive Modal (renders outside card, centered overlay) */}
      {selectedDirective && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedDirective(null)}>
          <div className="relative bg-white w-[650px] max-w-[95%] rounded-3xl shadow-2xl p-0 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close directive modal"
              onClick={(e) => { e.stopPropagation(); setSelectedDirective(null); }}
              className="absolute right-3 top-3 rounded-full p-2 bg-white text-gray-700 shadow-sm hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8 text-white w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-3xl shadow-lg mb-0">
              <h2 className="text-white text-2xl font-bold">Directive Details: {selectedDirective!.directiveId}</h2>
              <p className="text-blue-100 text-sm mt-1">Detailed view of the directive and contractor actions</p>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Issued By</div>
                  <div className="font-medium text-gray-900">{selectedDirective!.from || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Issue Date</div>
                  <div className="font-medium text-gray-900">{selectedDirective!.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Priority</div>
                  <div className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${selectedDirective!.priority === 'High' ? 'bg-red-200 text-red-800' : selectedDirective!.priority === 'Medium' ? 'bg-yellow-200 text-yellow-900' : 'bg-green-200 text-green-800'}`}>{selectedDirective!.priority}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Current Status</div>
                  <div className="font-medium text-gray-900">{selectedDirective!.status}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Full Directive</div>
                <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-100 text-sm text-gray-800">{selectedDirective!.subject}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Attachments</div>
                <div className="mt-2 flex flex-col gap-2">
                  {selectedDirective!.attachments?.length ? (
                    selectedDirective!.attachments!.map((a, i) => {
                      if (typeof a === 'string') {
                        return (
                          <div key={i} className="flex items-center justify-between bg-white border rounded px-3 py-2">
                            <div className="text-sm text-gray-700">{a}</div>
                            <div className="flex items-center gap-2">
                              <a href="#" className="text-blue-600 text-sm">View</a>
                              <a href="#" className="text-gray-600 text-sm">Download</a>
                            </div>
                          </div>
                        );
                      }
                      const item = a as AttachmentItem;
                      return (
                        <div key={i} className="flex items-center justify-between bg-white border rounded px-3 py-2">
                          <div className="flex items-center gap-3">
                            {item.type?.startsWith('image') && item.url ? (
                              <img src={item.url} alt={item.name} className="h-12 w-12 object-cover rounded" />
                            ) : (
                              <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded text-sm">PDF</div>
                            )}
                            <div className="text-sm text-gray-700">{item.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.url ? (
                              <>
                                <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">View</a>
                                <a href={item.url} download={item.name} className="text-gray-600 text-sm">Download</a>
                              </>
                            ) : (
                              <div className="text-sm text-gray-600">Unavailable</div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-600">No attachments provided.</div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Remarks</div>
                <div className="mt-2 space-y-2">
                  {selectedDirective!.remarks?.length ? (
                    selectedDirective!.remarks!.map((r, i) => (
                      <div key={i} className="text-sm text-gray-700 bg-white border rounded px-3 py-2">{r}</div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-600">No remarks yet.</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                <button
                  onClick={() => {
                    const updated = { ...selectedDirective, status: 'Completed' } as Directive;
                    setDirectives((prev) => prev.map(d => d.directiveId === updated.directiveId ? updated : d));
                    setSelectedDirective(updated);
                  }}
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Mark Compliance
                </button>
                <div className="ml-auto flex items-center gap-2">
                  {showRemarksBox ? (
                    <div className="flex items-center gap-2">
                      <input value={newRemark} onChange={(e) => setNewRemark(e.target.value)} className="px-3 py-2 border rounded" placeholder="Add remark" />
                      <button
                        onClick={() => {
                          if (!newRemark.trim()) return;
                          const updated = { ...selectedDirective } as Directive;
                          updated.remarks = [...(updated.remarks || []), newRemark.trim()];
                          setDirectives((prev) => prev.map(d => d.directiveId === updated.directiveId ? updated : d));
                          setSelectedDirective(updated);
                          setNewRemark('');
                          setShowRemarksBox(false);
                        }}
                        className="px-3 py-2 rounded bg-emerald-600 text-white"
                      >Save</button>
                      <button onClick={() => { setShowRemarksBox(false); setNewRemark(''); }} className="px-3 py-2 rounded border">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowRemarksBox(true)} className="px-3 py-2 rounded-md bg-gray-100 border">Add Remarks</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>, document.body
      )}
    </div>
  );
};

export default Directives;