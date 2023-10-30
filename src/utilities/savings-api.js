import sendRequest from "./send-request";
const BASE_URL = "/api/savings";

export const getEmergencyFund = (userId) => {
	return sendRequest(`${BASE_URL}/${userId}`);
}

export const setEmergencyFund = (savings) => {
	return sendRequest(BASE_URL, "POST", savings);
};

export const editEmergencyFund = (savings, savingsId) => {
	return sendRequest(`${BASE_URL}/${savingsId}`, "PATCH", savings);
};