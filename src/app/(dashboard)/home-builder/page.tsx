"use client";

import { Layout, Eye, GripVertical, Settings2, Trash2, Plus, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { saveHomeLayout, getHomeLayout } from "../../actions";

const initialSections = [
  { id: 1, name: "Hero Section", type: "Header Slider", active: true },
  { id: 2, name: "Trust Bar Stats", type: "Counters", active: true },
  { id: 3, name: "Our Services Grid", type: "Service Cards", active: true },
  { id: 4, name: "Featured Portfolio", type: "Project Carousel", active: true },
  { id: 5, name: "Testimonials", type: "Quote Slider", active: false },
  { id: 6, name: "Call to Action Banner", type: "CTA", active: true },
];

export default function HomeBuilderPage() {
  const [sections, setSections] = useState(initialSections);
  const [configuringSection, setConfiguringSection] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getHomeLayout().then((data) => {
      if (data && data.length > 0) setSections(data);
    });
  }, []);

  const handlePublish = async () => {
    setIsSaving(true);
    await saveHomeLayout(sections);
    setIsSaving(false);
    alert("Changes Published successfully!");
  };
  
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const sectionsClone = [...sections];
    const draggedItemContent = sectionsClone.splice(dragItem.current, 1)[0];
    sectionsClone.splice(dragOverItem.current, 0, draggedItemContent);
    
    setSections(sectionsClone);
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const toggleSection = (index: number) => {
    const sectionsClone = [...sections];
    sectionsClone[index].active = !sectionsClone[index].active;
    setSections(sectionsClone);
  };

  const saveConfiguration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name") as string;
    
    if (configuringSection !== null && newName) {
      const sectionsClone = [...sections];
      const index = sectionsClone.findIndex(s => s.id === configuringSection);
      if (index !== -1) {
        sectionsClone[index].name = newName;
        setSections(sectionsClone);
      }
    }
    setConfiguringSection(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Configuration Modal */}
      {configuringSection !== null && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Configure Section</h3>
            </div>
            <form onSubmit={saveConfiguration} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Display Name</label>
                <input 
                  name="name"
                  type="text" 
                  defaultValue={sections.find(s => s.id === configuringSection)?.name}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setConfiguringSection(null)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Home Page Builder</h1>
          <p className="text-slate-500 mt-1">Manage and reorder sections on the public homepage.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <Eye size={18} />
            Preview
          </button>
          <button disabled={isSaving} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm flex items-center gap-2 disabled:opacity-70" onClick={handlePublish}>
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {sections.map((section, index) => (
            <div 
              key={section.id} 
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className={`bg-white rounded-xl border cursor-move ${section.active ? 'border-slate-200' : 'border-slate-200 opacity-60'} shadow-sm flex items-center p-4 gap-4 transition-all hover:border-indigo-300 hover:shadow-md`}
            >
              <button className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing">
                <GripVertical size={20} />
              </button>
              <div className="p-3 bg-slate-50 rounded-lg text-slate-500 pointer-events-none">
                <Layout size={20} />
              </div>
              <div className="flex-1 pointer-events-none">
                <h3 className="text-base font-semibold text-slate-900">{section.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{section.type}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="sr-only peer" checked={section.active} onChange={() => toggleSection(index)} />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                
                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Configure Section" onClick={(e) => { e.stopPropagation(); setConfiguringSection(section.id); }}>
                  <Settings2 size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Remove" onClick={(e) => { e.stopPropagation(); setSections(sections.filter(s => s.id !== section.id)); }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:bg-slate-50 hover:text-slate-700 transition-colors flex items-center justify-center gap-2" onClick={() => setSections([...sections, { id: Date.now(), name: "New Section", type: "Custom Content", active: true }])}>
            <Plus size={18} /> Add New Section
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center sticky top-6">
            <div className="w-full aspect-[9/16] bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden relative flex flex-col">
              <div className="h-12 bg-slate-800 w-full mb-1 shrink-0"></div>
              
              <div className="flex-1 flex flex-col gap-1 overflow-hidden p-1">
                {sections.filter(s => s.active).map(section => (
                  <div key={section.id} className="w-full rounded bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-[10px] text-indigo-400 font-medium py-2 px-1 text-center truncate">
                    {section.name}
                  </div>
                ))}
              </div>
              
              <div className="h-20 bg-slate-800 w-full mt-auto shrink-0"></div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium">Live Wireframe Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}