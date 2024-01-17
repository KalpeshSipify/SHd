/**
 * The above function is a JavaScript code that handles the logout functionality using AWS Amplify's
 * Auth module for email login to Cognito.
 * @returns an object with two properties: "success" and "ResponseData". The "success" property
 * indicates whether the logout request was successful or not, and the "ResponseData" property contains
 * the response data from the logout request.
 */
import { Auth } from "aws-amplify";

// function for email login to cognito
export const LogOutHandler = async () => {
  try {
    //sendging logout request
    const Data = await Auth.signOut();

    // return success if response is successfull
    return { success: true, ResponseData: Data };
  } catch (error) {
    // return falid
    return { success: false, ResponseData: "Faild!" };
  }
};
