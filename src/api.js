import axios from "axios";

const API_BASE = "http://localhost:3001/api/project";

export const saveProject = async (projectId, files) => {
  try {
    const response = await axios.post(`${API_BASE}/save`, {
      projectId,
      files,
    });
    return response.data;
  } catch (err) {
    console.error("Save Project Error:", err);
    throw err;
  }
};

export const loadProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_BASE}/load/${projectId}`);
    return response.data; // Return the entire response data
  } catch (err) {
    console.error("Load Project Error:", err);
    throw err;
  }
};