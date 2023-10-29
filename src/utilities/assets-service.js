import debug from "debug";
import * as assetsAPI from "./assets-api";

const log = debug("finviewx:assetsService");

export const createAsset = async (asset) => {
	const data = await assetsAPI.createAsset(asset);
    log(asset);
};

export const editAsset = async (asset) => {
	const data = await assetsAPI.editReview(asset);
	log(data);
};
