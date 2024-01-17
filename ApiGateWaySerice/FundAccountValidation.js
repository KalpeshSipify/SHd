import axios from "axios";
import { SHD_baseUrl } from "../BaseUrl/BaseUrl";

// get Contact id function
export const FundAccountValidationPostService = async (
  sendData,
  AUTH_TOKEN,
  apiKey
) => {
  try {
    // making post request
    const response = await axios.post(
      `${SHD_baseUrl}/FundAccountValidation`,
      sendData,
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    // if successfull post
    return { success: true, Data: response };
  } catch (error) {
    // if faiid
    throw new Error("Error To Validation Fund Account ");
  }
};
