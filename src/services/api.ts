/// <reference types="vite/client" />
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// GET /leads
export async function fetchLeads() {
  try {
    const res = await api.get("/leads");

    // Garante array SEMPRE
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;

    return [];
  } catch (err) {
    console.error("[API ERROR]", err);
    return [];
  }
}

// PATCH /leads/:id/status
export async function patchLeadStatus(id: string | number, status: string) {
  const res = await api.patch(`/leads/${id}/status`, { status });
  return res.data;
}

export default api;
