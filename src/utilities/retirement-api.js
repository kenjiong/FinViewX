import sendRequest from "./send-request";
const BASE_URL = "/api/retirement";

export const getRetirementGoal = (userId) => {
	return sendRequest(`${BASE_URL}/${userId}`);
}

export const setRetirementGoal = (retirement) => {
	return sendRequest(BASE_URL, "POST", retirement);
};

export const editRetirementGoal = (retirement, retirementId) => {
	return sendRequest(`${BASE_URL}/${retirementId}`, "PATCH", retirement);
};