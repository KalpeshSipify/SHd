/**
 * The above function is a JavaScript function that handles email login to a Cognito user pool using
 * the AWS Amplify library.
 * @param email - The email parameter is the email address that the user wants to use for logging in.
 * @returns an object with two properties: "success" and "ResponseData". The "success" property
 * indicates whether the login was successful or not, and the "ResponseData" property contains the
 * response data from the login request.
 */
import { Auth } from "aws-amplify";

// function for email login to cognito
export const EmailLoginHandler = async (email) => {
  try {
    //sendging login request
    const LoginResponse = await Auth.signIn(email);

    // return success if response is successfull
    return { success: true, ResponseData: LoginResponse };
  } catch (error) {
    // return falid
    return { success: false, ResponseData: "Faild!" };
  }
};
