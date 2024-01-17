import { Auth } from "aws-amplify";
import { GetApiKeyGetService } from "../ApiGateWaySerice/GetApiKeyForAuthUser";

/**
 * The function uses the AWS Amplify library to authenticate a user with their email
 * and retrieve the authenticated user data.
 * @returns {Promise<{ success: boolean, Data?: object, AuthToken?: string, AuthKey?: string, message?: string }>}
 */
export const getAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const {
      signInUserSession: {
        idToken: { jwtToken },
      },
    } = user;

    const {
      Data: { apiKey },
    } = await GetApiKeyGetService(jwtToken);

    // If the user is authenticated, resolve the promise with user data
    return { success: true, Data: user, AuthToken: jwtToken, AuthKey: apiKey };
  } catch (error) {
    // Handle specific errors
    if (error.name === "NotAuthorizedException") {
      return { success: false, message: "User not authorized!" };
    }

    // Handle other errors
    return {
      success: false,
      message: "User not authenticated!",
      error: error.message,
    };
  }
};
