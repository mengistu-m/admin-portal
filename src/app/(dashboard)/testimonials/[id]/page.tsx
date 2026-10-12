import { getTestimonial, updateTestimonial } from "../../../actions";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const testimonial = await getTestimonial(parseInt((await params).id));
  if (!testimonial) notFound();

  async function handleSubmit(formData: FormData) {
    "use server";
    const clientName = formData.get("clientName") as string;
    const company = formData.get("company") as string;
    const quote = formData.get("quote") as string;
    const rating = parseInt(formData.get("rating") as string);
    const status = formData.get("status") as string;

    if (!clientName || !quote || !rating) return;

    await updateTestimonial(parseInt((await params).id), { clientName, company, quote, rating, status });
    redirect("/testimonials");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/testimonials" className="p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Testimonial</h1>
          <p className="text-slate-500 mt-1">Update client review details.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Client Name *</label>
              <input name="clientName" defaultValue={testimonial.clientName} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Company</label>
              <input name="company" defaultValue={testimonial.company || ""} type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Quote *</label>
            <textarea name="quote" defaultValue={testimonial.quote} required rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Rating (1-5) *</label>
              <input name="rating" defaultValue={testimonial.rating} required type="number" min="1" max="5" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Status *</label>
              <select name="status" defaultValue={testimonial.status} required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                <option value="Published">Published</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/testimonials" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
