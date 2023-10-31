import debug from "debug";
import * as retirementAPI from "./retirement-api";

const log = debug("finviewx:retirementService");

export const getRetirementGoal = async (userId) => {
  const data = await retirementAPI.getRetirementGoal(userId);
  log(data);
  return data;
};

export const setRetirementGoal = async (retirement) => {
  const data = await retirementAPI.setRetirementGoal(retirement);
  log(data);
  return data;
};

export const editRetirementGoal = async (retirement, retirementId) => {
  const data = await retirementAPI.editRetirementGoal(retirement, retirementId);
  log(data);
  return data;
};
