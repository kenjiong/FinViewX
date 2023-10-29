import debug from "debug";
import * as assetsAPI from "./assets-api";

const log = debug("finviewx:assetsService");

export const getAllAssets = async (userId) => {
  const data = await assetsAPI.getAllAssets(userId);
  log(data);
  return data;
};

export const createAsset = async (asset) => {
  const data = await assetsAPI.createAsset(asset);
  log(data);
  return data;
};

export const editAsset = async (asset) => {
  const data = await assetsAPI.editAsset(asset);
  log(data);
  return data;
};

export const deleteAsset = async (assetId) => {
	const data = await assetsAPI.deleteAsset(assetId);
	log(data);
	return data;
}