import axios from "axios";
import { SHD_baseUrl } from "../BaseUrl/BaseUrl";
import { LogOutHandler } from "../CognitoServices/SignOut";

// get Contact id function
export const GetContactIDGetService = async (sub, AUTH_TOKEN, apiKey) => {
  try {
    // params
    const params = {
      CognitoUserID: sub,
    };
    // convert to qureyStrin g
    const queryString = new URLSearchParams(params).toString();
    // making post request
    const response = await axios.get(
      `${SHD_baseUrl}/GetContactID?${queryString}`,
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );

    // if successfull post
    return { success: true, ContactIdData: response };
  } catch (error) {
    await LogOutHandler(); // If an error occurs during getting contact id, log out the user
    // if faiid
    throw new Error("Error To Get Contact ID");
  }
};
