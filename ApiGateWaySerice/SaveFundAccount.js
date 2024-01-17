import axios from "axios";
import { SHD_baseUrl } from "../BaseUrl/BaseUrl";

// get Contact id function
export const SaveFundAccountPostService = async (data, AUTH_TOKEN, apiKey) => {
  try {
    //  fectch validation func account by fAV_ID
    const response = await axios.post(
      `${SHD_baseUrl}/SaveFundAccountDetails`,
      data,
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
    console.log(error.message);
    // if faiid
    throw new Error("Error To Save Fund Account Details");
  }
};
