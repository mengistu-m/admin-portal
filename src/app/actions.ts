"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// -- LEADS --
export async function getLeads() {
  return await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createLead(data: { name: string; company?: string; email: string; phone?: string; service: string }) {
  await prisma.lead.create({ data });
  revalidatePath("/leads");
}

export async function updateLeadStatus(id: number, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/leads");
}

export async function deleteLead(id: number) {
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/leads");
}

// -- PROJECTS --
export async function getProjects() {
  return await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProject(id: number) {
  return await prisma.project.findUnique({ where: { id } });
}

export async function createProject(data: { title: string; clientName?: string; category: string; status: string; date: string; description?: string }) {
  await prisma.project.create({ data });
  revalidatePath("/portfolio");
}

export async function updateProject(id: number, data: { title: string; clientName?: string; category: string; status: string; date: string; description?: string }) {
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/portfolio");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/portfolio");
}

// -- SERVICES --
export async function getServices() {
  return await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getService(id: number) {
  return await prisma.service.findUnique({ where: { id } });
}

export async function createService(data: { name: string; description: string; status: string }) {
  await prisma.service.create({ data });
  revalidatePath("/services");
}

export async function updateService(id: number, data: { name: string; description: string; status: string }) {
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/services");
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
}

// -- JOBS (Careers) --
export async function getJobs() {
  return await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getJob(id: number) {
  return await prisma.job.findUnique({ where: { id } });
}

export async function createJob(data: { title: string; department: string; location: string; type: string; status: string }) {
  await prisma.job.create({ data });
  revalidatePath("/careers");
}

export async function updateJob(id: number, data: { title: string; department: string; location: string; type: string; status: string }) {
  await prisma.job.update({ where: { id }, data });
  revalidatePath("/careers");
}

export async function deleteJob(id: number) {
  await prisma.job.delete({ where: { id } });
  revalidatePath("/careers");
}

// -- TEAM MEMBERS --
export async function getTeamMembers() {
  return await prisma.teamMember.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getTeamMember(id: number) {
  return await prisma.teamMember.findUnique({ where: { id } });
}

export async function createTeamMember(data: { name: string; role: string; bio?: string; status: string }) {
  await prisma.teamMember.create({ data });
  revalidatePath("/team");
}

export async function updateTeamMember(id: number, data: { name: string; role: string; bio?: string; status: string }) {
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/team");
}

export async function deleteTeamMember(id: number) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/team");
}

// -- BLOG POSTS --
export async function getBlogPosts() {
  return await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogPost(id: number) {
  return await prisma.blogPost.findUnique({ where: { id } });
}

export async function createBlogPost(data: { title: string; content: string; category: string; status: string }) {
  await prisma.blogPost.create({ data });
  revalidatePath("/blog");
}

export async function updateBlogPost(id: number, data: { title: string; content: string; category: string; status: string }) {
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/blog");
}

export async function deleteBlogPost(id: number) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
}

export async function getHomeLayout() {
  const setting = await prisma.setting.findUnique({ where: { id: "home-layout" } });
  return setting ? JSON.parse(setting.value) : null;
}

export async function saveHomeLayout(layout: any) {
  await prisma.setting.upsert({
    where: { id: "home-layout" },
    update: { value: JSON.stringify(layout) },
    create: { id: "home-layout", value: JSON.stringify(layout) }
  });
  revalidatePath("/home-builder");
}

// -- TESTIMONIALS --
export async function getTestimonials() {
  return await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getTestimonial(id: number) {
  return await prisma.testimonial.findUnique({ where: { id } });
}

export async function createTestimonial(data: { clientName: string; company?: string; quote: string; rating: number; status: string }) {
  await prisma.testimonial.create({ data });
  revalidatePath("/testimonials");
}

export async function updateTestimonial(id: number, data: { clientName: string; company?: string; quote: string; rating: number; status: string }) {
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/testimonials");
}

export async function deleteTestimonial(id: number) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/testimonials");
}
