import axios from "axios";
import { SHD_baseUrl } from "../BaseUrl/BaseUrl";
import { LogOutHandler } from "../CognitoServices/SignOut";

// get Contact id function
export const GetApiKeyGetService = async (AUTH_TOKEN) => {
  try {
    // Fetch validation func account by FAV_ID
    const response = await axios.get(`${SHD_baseUrl}/GetApiKeyAuthUser`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    // If successful post
    return { success: true, Data: response.data };
  } catch (error) {
    // if error logut user
    await LogOutHandler();
    console.log(error.message);
    // If failed
    throw new Error("Error To Get Api key");
  }
};
