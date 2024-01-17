/**
 * The above function is a JavaScript code that handles the verification of a one-time password (OTP)
 * using the AWS Amplify library.
 * @param cognitoUser - The `cognitoUser` parameter is an object representing the user in Amazon
 * Cognito. It contains information about the user, such as their username and session tokens.
 * @param answer - The `answer` parameter is the user's response to the custom challenge. In this code,
 * it is used as the second argument in the `Auth.sendCustomChallengeAnswer` function to verify the
 * user's response to the challenge.
 * @returns an object with two properties: "success" and "Data" (if successful) or "message" (if
 * unsuccessful). If the OTP verification is successful, the "success" property will be set to true and
 * the "Data" property will contain the response from the Auth.sendCustomChallengeAnswer() function. If
 * the OTP verification fails, the "success" property will be set to
 */
import { Auth } from "aws-amplify";

// function for verify opt to cognito
export const VerifyOptHandler = async (cognitoUser, answer) => {
  try {
    //sendging login request
    const response = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);

    // This will throw an error if the user is not yet authenticated:
    await Auth.currentSession();
    // return success if response is successfull
    return { success: true, Data: response };
  } catch (error) {
    // return falid
    return {
      success: false,
      message: "Invalid OTP",
    };
  }
};
