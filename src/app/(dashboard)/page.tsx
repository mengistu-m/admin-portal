import { 
  Users, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  ArrowUpRight,
  PlusCircle
} from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "New Leads", value: "24", icon: Users, change: "+12%", changeType: "positive" },
  { name: "Pending Testimonials", value: "3", icon: MessageSquare, change: "Needs review", changeType: "neutral" },
  { name: "Draft Blog Posts", value: "5", icon: FileText, change: "2 scheduled", changeType: "neutral" },
  { name: "Open Applications", value: "12", icon: Briefcase, change: "+4 this week", changeType: "positive" },
];

const recentActivity = [
  { id: 1, action: "Published a new project", item: "Downtown Skyline Tower", user: "Admin User", time: "2 hours ago" },
  { id: 2, action: "Updated service", item: "Architectural Design", user: "Content Editor", time: "4 hours ago" },
  { id: 3, action: "Approved testimonial", item: "Sarah Jenkins (Acme Corp)", user: "Admin User", time: "1 day ago" },
  { id: 4, action: "Created draft blog post", item: "Future of Sustainable Building", user: "Content Editor", time: "2 days ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/portfolio/new" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <PlusCircle size={16} />
            Add Project
          </Link>
          <Link href="/blog/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
            <PlusCircle size={16} />
            Add Blog Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Icon size={20} />
                </div>
                {stat.changeType === 'positive' && (
                  <span className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={14} className="mr-1" />
                    {stat.change}
                  </span>
                )}
                {stat.changeType === 'neutral' && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Site Traffic Summary</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50">
            <p className="text-slate-400 text-sm">Chart integration (e.g. Recharts or Chart.js) goes here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-sm text-slate-900 font-medium">
                    {activity.action}: <span className="font-semibold">{activity.item}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    By {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
