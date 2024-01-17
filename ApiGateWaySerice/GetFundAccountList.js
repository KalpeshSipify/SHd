import axios from "axios";
import { SHD_baseUrl } from "../BaseUrl/BaseUrl";

// get Contact id function
export const GetFundAccountGetService = async (
  ContactID,
  AUTH_TOKEN,
  apiKey
) => {
  try {
    // params
    const params = {
      ContactID,
    };
    // convert to qureyStrin g
    const queryString = new URLSearchParams(params).toString();
    //  fectch validation func account by fAV_ID
    const response = await axios.get(
      `${SHD_baseUrl}/GetListFundAccount?${queryString}`,
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
    throw new Error("Error To Get Fund Account List");
  }
};
