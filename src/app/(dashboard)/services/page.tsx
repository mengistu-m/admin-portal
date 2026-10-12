import { Plus, Edit, Trash2, GripVertical, Settings2 } from "lucide-react";
import Link from "next/link";

import { getServices, deleteService } from "../../actions";

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services Manager</h1>
          <p className="text-slate-500 mt-1">Manage the core services offered by your company.</p>
        </div>
        <Link href="/services/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} />
          Add Service
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <p className="text-sm text-slate-600 font-medium">Drag to reorder services on the public website</p>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Save Order</button>
        </div>
        <div className="divide-y divide-slate-200">
          {services.map((service) => (
            <div key={service.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors group">
              <button className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing">
                <GripVertical size={20} />
              </button>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">{service.name}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{service.description}</p>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                service.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {service.status}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Manage Sub-services">
                  <Settings2 size={16} />
                </button>
                <Link href={`/services/${service.id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                  <Edit size={16} />
                </Link>
                <form action={async () => { "use server"; await deleteService(service.id); }}>
                  <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}