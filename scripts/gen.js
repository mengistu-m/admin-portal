const fs = require('fs');
const path = require('path');
const dirs = ['home-builder', 'services', 'portfolio', 'testimonials', 'team', 'blog', 'careers', 'leads', 'settings'];
dirs.forEach(dir => {
  const dirPath = path.join('src/app/(dashboard)', dir);
  fs.mkdirSync(dirPath, { recursive: true });
  const title = dir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), `
    export default function Page() {
      return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-6xl mx-auto min-h-[600px]">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">${title}</h1>
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
            <p className="text-slate-500 font-medium">This module is under development.</p>
            <p className="text-slate-400 text-sm mt-1">Check back later or start implementing the UI here.</p>
          </div>
        </div>
      );
    }
  `);
});
console.log('Pages created!');
