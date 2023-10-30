import debug from "debug";
import * as savingsAPI from "./savings-api";

const log = debug("finviewx:savingsService");

export const getEmergencyFund = async (userId) => {
  const data = await savingsAPI.getEmergencyFund(userId);
  log(data);
  return data;
};

export const setEmergencyFund = async (savings) => {
  const data = await savingsAPI.setEmergencyFund(savings);
  log(data);
  return data;
};

export const editEmergencyFund = async (savings, savingsId) => {
  const data = await savingsAPI.editEmergencyFund(savings, savingsId);
  log(data);
  return data;
};