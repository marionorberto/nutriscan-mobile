import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants/data";

export const handleLogin = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.acess_token) {
      await AsyncStorage.setItem("token", response.data.acess_token);
    }

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const handleRegister = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) => {
  const username = firstname.toLowerCase() + lastname.toLowerCase();
  email = email.toLowerCase();
  try {
    const res = await axios.post(`${API_URL}/users/create/user`, {
      firstname,
      lastname,
      username,
      email,
      password,
    });

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const handleProfile = async (
  neighbourhood: string,
  province: string,
  birthday: string,
  municipy: string,
  phone: string,
  gender: string,
  img: string,
  userID: string,
) => {
  try {
    const addressToBeParsed = { province, municipy, neighbourhood };

    const address = JSON.stringify(addressToBeParsed);

    const res = await axios.post(`${API_URL}/profiles/create/profile`, {
      address,
      birthday,
      phone,
      gender,
      img,
      userID,
    });

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const handleCinicalProfile = async (
  weight: number,
  height: number,
  physicalActivityLevel: string,
  selectedConditions: string[],
  userID: string,
) => {
  try {
    const bmi = height * Math.pow(weight, 2);

    const res = await axios.post(
      `${API_URL}/clinical-profiles/create/clinical-profile`,
      {
        weight: Number(weight),
        height: Number(height),
        bmi: Number(bmi),
        physicalActivityLevel,
        selectedConditions,
        userID,
      },
    );

    return res.data;
  } catch (error: any) {
    console.log("clinical profile", error);
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const handleCreateAllergies = async (
  allergies: string[],
  userID: string,
) => {
  try {
    const res = await axios.post(
      `${API_URL}/allergies/create-association/allergy`,
      {
        allergies,
        userID,
      },
    );

    return res.data;
  } catch (error: any) {
    console.log("allergies error", error);
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar allergies!";
  }
};

export const handleCreateDiabeteProfile = async (
  diabetiType: string,
  currentStatus: string,
  diagnosisYear: string,
  lastFastingGlucose: number,
  lastHba1c: number,
  hypoGlycemiaFrequency: string,
  hyperGlycemiaFrequency: string,
  userID: string,
) => {
  try {
    const res = await axios.post(
      `${API_URL}/diabete-profiles/create/diabete-profile`,
      {
        diabetiType,
        currentStatus,
        diagnosisYear: diagnosisYear,
        lastFastingGlucose,
        lastHba1c,
        hypoGlycemiaFrequency,
        hyperGlycemiaFrequency,
        userID,
      },
    );

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};
export const handleCreateDietaryRoutine = async (
  mealsPerDay: number,
  favoriteFoods: string[],
  foodsToAvoid: string[],
  culturalPreferences: string,
  religiousRestrictions: string[],
  mealSchedules: string[],
  userID: string,
) => {
  try {
    const res = await axios.post(
      `${API_URL}/dietary-routines/create/dietary-routine`,
      {
        mealsPerDay,
        favoriteFoods: JSON.stringify(favoriteFoods),
        foodsToAvoid: JSON.stringify(foodsToAvoid),
        culturalPreferences,
        religiousRestrictions: JSON.stringify(religiousRestrictions),
        mealSchedules: JSON.stringify(mealSchedules),
        userID,
      },
    );

    return res.data;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const checkEmailUser = async (email: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/check/email`, {
      email,
    });

    return data.data.registered;
  } catch (error: any) {
    if (error.response.message) throw error.response.message;
    throw error.response.data || "Erro tentando fazer registrar!";
  }
};

export const handleLogout = async (): Promise<void> => {
  await AsyncStorage.removeItem("token");
};

export const handleIsUserLoggedIn = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("token");
  return token !== null;
};
