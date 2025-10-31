'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertTriangle,
  BarChart3,
  Building,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Database,
  Download,
  FileCode,
  FileText, // Using FileText as a replacement for FilePdf
  Paperclip,
  RefreshCw,
  Sparkles,
  Target,
} from 'lucide-react';

// --- MOCK DATA ---

const caseStatsData = [
  {
    title: 'Total Cases',
    metric: '245',
    icon: ClipboardList,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
  },
  {
    title: 'Total FIRs Filed',
    metric: '230',
    icon: FileText,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
  },
  {
    title: 'Charge Sheets Filed',
    metric: '198',
    icon: CheckSquare,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
  },
  {
    title: 'Compensation Paid',
    metric: '185',
    icon: CheckCircle2,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
  },
];

const grievanceChartData = [
  { name: 'Logged', value: 120 },
  { name: 'Resolved', value: 95 },
  { name: 'Escalated', value: 25 },
];
const GRIEVANCE_COLORS = {
  Logged: '#3B82F6', // blue-500
  Resolved: '#10B981', // green-500
  Escalated: '#EF4444', // red-500
};

const complianceChartData = [
  { name: 'Complied', value: 88 },
  { name: 'Pending', value: 12 },
];
const COMPLIANCE_COLORS = {
  Complied: '#10B981', // green-500
  Pending: '#F59E0B', // amber-500
};

const compensationStatsData = [
  {
    title: 'Total Sanctioned',
    metric: '₹1,25,00,000',
    icon: CircleDollarSign,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
  },
  {
    title: 'Total Paid',
    metric: '₹1,18,50,000',
    icon: CheckCircle2,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
  },
  {
    title: 'Total Pending',
    metric: '₹6,50,000',
    icon: AlertTriangle,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-red-400 to-red-600',
  },
];

const stationPerformanceData = [
  {
    name: 'Delhi North',
    Cases: 45,
    'Resolution %': 88,
    'Compensation Paid': 42,
  },
  {
    name: 'Mumbai Central',
    Cases: 30,
    'Resolution %': 95,
    'Compensation Paid': 30,
  },
  {
    name: 'Lucknow Zone',
    Cases: 55,
    'Resolution %': 75,
    'Compensation Paid': 48,
  },
  {
    name: 'Kolkata South',
    Cases: 28,
    'Resolution %': 92,
    'Compensation Paid': 25,
  },
  {
    name: 'Chennai City',
    Cases: 40,
    'Resolution %': 80,
    'Compensation Paid': 35,
  },
];

// --- HELPER COMPONENTS ---

/**
 * A reusable component for report section headings.
 */
const ReportSection = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) => (
  <div className="border-b border-slate-300 dark:border-slate-700 pb-3 mb-5">
    <h2 className="text-2xl font-semibold flex items-center gap-3">
      <Icon className="text-blue-500" size={24} />
      {title}
    </h2>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function AnnualReportPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* 1️⃣ Header & Action Buttons */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Annual Report (SP/CP)
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Auto-compiled summary of all Safai Karmachari related activities for
              the year.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm font-medium">
              <RefreshCw size={16} />
              Generate/Compile Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              <FileText size={16} className="text-red-500" />
              Export PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              <FileCode size={16} className="text-green-500" />
              Export HTML
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
              <Database size={16} className="text-yellow-500" />
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* 2️⃣ AI Assistance Panel */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2 mb-3">
          <Sparkles />
          Generative AI Assistance
        </h3>
        <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
          Use AI to help compile and refine your report for Ministry submission.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition-colors text-sm font-medium">
            <FileText size={16} />
            Summarize Report Narratives
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-600 rounded-lg shadow-sm hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors text-sm font-medium">
            <Target size={16} />
            Format for Ministry Submission
          </button>
        </div>
      </div>

      {/* 3️⃣ Annual Report Content Structure */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-6 md:p-10 space-y-12">
        {/* Section: Overview */}
        <section>
          <ReportSection title="1. Overview" icon={FileText} />
          <div className="text-slate-600 dark:text-slate-300 space-y-4">
            <p>
              This report provides a comprehensive summary of all law
              enforcement activities undertaken by the [Jurisdiction Name] Police
              in relation to the implementation of the &quot;Prohibition of
              Employment as Manual Scavengers and their Rehabilitation Act,
              2013&quot; for the year [Year].
            </p>
            <p className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
              [AI-Generated Summary Placeholder]... The year saw a total of 245
              cases registered, with a significant focus on timely investigation
              and compensation disbursement, resulting in a 90% charge sheet
              filing rate.
            </p>
          </div>
        </section>

        {/* Section: Case Statistics */}
        <section>
          <ReportSection title="2. Case Statistics" icon={BarChart3} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStatsData.map((item) => (
              <div
                key={item.title}
                className={`${item.bgColor} rounded-lg shadow-md p-5 border-transparent transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30`}
                  >
                    <item.icon size={24} className={item.color} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">
                      {item.title}
                    </div>
                    <div className="text-3xl font-bold text-white">{item.metric}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Grievance & Direction Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ReportSection title="3. Grievance Summary" icon={ClipboardList} />
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={grievanceChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    className="text-sm"
                  >
                    {grievanceChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          GRIEVANCE_COLORS[
                            entry.name as keyof typeof GRIEVANCE_COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <ReportSection
              title="4. Direction Compliance"
              icon={CheckSquare}
            />
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    className="text-sm"
                  >
                    {complianceChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          COMPLIANCE_COLORS[
                            entry.name as keyof typeof COMPLIANCE_COLORS
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Section: Compensation Status */}
        <section>
          <ReportSection
            title="5. Compensation Status"
            icon={CircleDollarSign}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {compensationStatsData.map((item) => (
              <div
                key={item.title}
                className={`${item.bgColor} rounded-lg shadow-md p-5 border-transparent transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 border border-white/30`}
                  >
                    <item.icon size={24} className={item.color} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">
                      {item.title}
                    </div>
                    <div className="text-2xl font-bold text-white">{item.metric}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Station Performance */}
        <section>
          <ReportSection title="6. Station Performance" icon={Building} />
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stationPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.2}
                  className="stroke-slate-300 dark:stroke-slate-700"
                />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  stroke="currentColor"
                />
                <YAxis
                  yAxisId="left"
                  className="text-xs"
                  stroke="currentColor"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  stroke="#10B981"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                  }}
                  cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="Cases"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="Compensation Paid"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="Resolution %"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Section: Challenges & Recommendations */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ReportSection title="7. Challenges" icon={AlertTriangle} />
            <div className="text-slate-600 dark:text-slate-300 space-y-3">
              <p className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                [AI-Generated Summary Placeholder]... Key operational bottlenecks
                included delays in receiving fund disbursement approvals from
                external agencies and coordinating witness statements for charge
                sheets.
              </p>
            </div>
          </div>
          <div>
            <ReportSection title="8. Recommendations" icon={CheckSquare} />
            <div className="text-slate-600 dark:text-slate-300 space-y-3">
              <p className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                [AI-Generated Summary Placeholder]... It is recommended to
                establish a single-window clearance for compensation disbursement
                at the District Nodal level and to utilize the digital evidence
                from the Safai Karmachari App as primary evidence.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Appendices */}
        <section>
          <ReportSection title="9. Appendices" icon={Paperclip} />
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2">
            <li>Appendix A: Complete FIR Log (Police Station-wise)</li>
            <li>Appendix B: Detailed Compensation Disbursement Records</li>
            <li>Appendix C: Grievance Escalation Briefs</li>
            <li>Appendix D: Direction Compliance Audit Trail</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

