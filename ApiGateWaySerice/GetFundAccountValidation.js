import axios from "axios";
import { SHD_baseUrl, baseUrl } from "../BaseUrl/BaseUrl";

// get Contact id function
export const GetFundAccountValidationGetService = async (
  FAV_ID,
  AUTH_TOKEN,
  apiKey
) => {
  try {
    // params
    const params = {
      Fav_Id: FAV_ID,
    };
    // convert to qureyStrin g
    const queryString = new URLSearchParams(params).toString();

    //  fectch validation func account by fAV_ID
    const response = await axios.get(
      `${SHD_baseUrl}/GetFundAccountValidation?${queryString}`,
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
    throw new Error("Error Getting Validation Fund Account");
  }
};
