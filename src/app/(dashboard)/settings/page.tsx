import { Save, Globe, Building, Share2, Shield, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-slate-500 mt-1">Configure global settings for your website and admin portal.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium bg-indigo-50 text-indigo-700 rounded-lg">
            <Building size={18} /> General Info
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Globe size={18} /> Theme & Branding
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Share2 size={18} /> Integrations & Social
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Shield size={18} /> Security
          </button>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Company Details</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Company Name</label>
                <input type="text" defaultValue="Acme Construction Consultancy" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Contact Email</label>
                  <input type="email" defaultValue="contact@acmeconstruction.com" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Main Office Address</label>
                <textarea rows={3} defaultValue="123 Business Avenue, Suite 400&#10;New York, NY 10001" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Logos & Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Main Logo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-50">
                  <div className="w-24 h-8 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400 mb-2">LOGO</div>
                  <button className="text-xs font-medium text-indigo-600">Change Logo</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Favicon</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-50">
                  <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400 mb-2">ICON</div>
                  <button className="text-xs font-medium text-indigo-600">Change Favicon</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}