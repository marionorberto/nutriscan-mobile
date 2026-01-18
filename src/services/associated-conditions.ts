import axios from "axios";
import { API_URL } from "../constants/data";

export const fetchAll = async () => {
  try {
    const res = await axios.get(`${API_URL}/associated-conditions/all`);

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};
