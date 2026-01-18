import axios from "axios";
import { API_URL } from "../constants/data";

export const fetch = async () => {
  try {
    const res = await axios.get(`${API_URL}/allergies/all`);

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};
