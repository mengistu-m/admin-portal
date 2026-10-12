import { createTeamMember } from "../../../actions";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTeamMemberPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const status = formData.get("status") as string;

    if (!name || !role || !status) return;

    await createTeamMember({ name, role, bio, status });
    redirect("/team");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/team" className="p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Team Member</h1>
          <p className="text-slate-500 mt-1">Add a new person to your company directory.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Full Name *</label>
              <input name="name" required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Role / Title *</label>
              <input name="role" required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Bio</label>
            <textarea name="bio" rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Status *</label>
            <select name="status" required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/team" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
