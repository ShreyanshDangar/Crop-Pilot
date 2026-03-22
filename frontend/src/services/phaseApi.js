import api from "./api.js";
function buildFormData(inputs, images, soilReport, modifier) {
  const formData = new FormData();
  formData.append("inputs", JSON.stringify(inputs));
  if (modifier) {
    formData.append("modifier", modifier);
  }
  if (images) {
    images.forEach((img, idx) => {
      if (img && img.file) {
        formData.append(`image_${idx}`, img.file);
      }
    });
  }
  if (soilReport && soilReport.file) {
    formData.append("soilReport", soilReport.file);
  }
  return formData;
}
export function analyzePhase1(data) {
  return api.post("/api/phase1/analyze", data);
}
export function analyzePhase2({ inputs, images, soilReport, modifier }) {
  const hasFiles = images?.some((img) => img !== null) || soilReport;
  if (hasFiles) {
    const formData = buildFormData(inputs, images, soilReport, modifier);
    return api.post("/api/phase2/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post("/api/phase2/analyze", { inputs, modifier });
}
export function analyzePhase3({ inputs, images, modifier }) {
  const hasFiles = images?.some((img) => img !== null);
  if (hasFiles) {
    const formData = buildFormData(inputs, images, null, modifier);
    return api.post("/api/phase3/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post("/api/phase3/analyze", { inputs, modifier });
}
export function analyzePhase4({ inputs, images, modifier }) {
  const hasFiles = images?.some((img) => img !== null);
  if (hasFiles) {
    const formData = buildFormData(inputs, images, null, modifier);
    return api.post("/api/phase4/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return api.post("/api/phase4/analyze", { inputs, modifier });
}
export const analyzePhase = {
  1: analyzePhase1,
  2: analyzePhase2,
  3: analyzePhase3,
  4: analyzePhase4,
};
export function getSessions() {
  return api.get("/api/sessions");
}
export function getSession(id) {
  return api.get(`/api/sessions/${id}`);
}
export function deleteSession(id) {
  return api.delete(`/api/sessions/${id}`);
}
