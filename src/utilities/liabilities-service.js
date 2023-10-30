import debug from "debug";
import * as liabilitiesAPI from "./liabilities-api";

const log = debug("finviewx:assetsService");

export const getAllLiabilities = async (userId) => {
  const data = await liabilitiesAPI.getAllLiabilities(userId);
  log(data);
  return data;
};

export const createLiability = async (liability) => {
  const data = await liabilitiesAPI.createLiability(liability);
  log(data);
  return data;
};

export const editLiability = async (liability, liabilityId) => {
  const data = await liabilitiesAPI.editLiability(liability, liabilityId);
  log(data);
  return data;
};

export const deleteLiability = async (liabilityId) => {
	const data = await liabilitiesAPI.deleteAsset(liabilityId);
	log(data);
	return data;
}