/**
 * The above code defines a React component called MainContextProvider that wraps multiple context
 * providers to manage state in a React application.
 * @returns The code is returning a component called `MainContextProvider`. This component is a wrapper
 * that provides multiple context providers to its children components. The context providers being
 * provided are `MemoizedInputProvider`, `MemoizedCognitoUserProvider`,
 * `MemoizedIsAuthenticateProvider`, `MemoizedReCallProvider`, `MemoizedCognitoUserIdProvider`, and
 * `MemoizedAppUpiFundFormDataProvider`.
 */
import { MemoizedAppUpiFundFormDataProvider } from "./AppUpiFundFormDataContext";
import { MemoizedCognitoUserProvider } from "./CognitoUserContext";
import { MemoizedCognitoUserIdProvider } from "./CognitoUserIdContext";
import { MemoizedContactIdProvider } from "./ContactIdContext";
import { MemoizedInputProvider } from "./InputContext";
import { MemoizedIsAuthenticateProvider } from "./IsAuthenticateContext";
import { MemoizedReCallProvider } from "./ReCallContext";
import { MemoizedFundAccountValidationIDProvider } from "./FundAccountValidationIDContext";
import { MemoizedVerifyAccountNoProvider } from "./VerifyAccountNoContext";
import { MemoizedAppVpainputProvider } from "./VpainputContext";
import { MemoizedIsTokenProvider } from "./TokenContext";
import { MemoizedFunAccountApiReCallProvider } from "./FunAccountApiReCallContext";

// Main context provider
// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  // proverde for IputeContext
  return (
    <MemoizedInputProvider>
      {/* Provider for EmailResponse Context */}
      <MemoizedCognitoUserProvider>
        {/* Provider for is Auth context */}
        <MemoizedIsAuthenticateProvider>
          {/* Provider for recall context */}
          <MemoizedReCallProvider>
            {/* Provider for Cognito user id ConText */}
            <MemoizedCognitoUserIdProvider>
              {/* provider for addupifundforminpoutdata  context */}
              <MemoizedAppUpiFundFormDataProvider>
                {/* provider for contact id context */}
                <MemoizedContactIdProvider>
                  {/* provider for the vpa input context */}
                  <MemoizedAppVpainputProvider>
                    {/* provider for the upi id context */}
                    <MemoizedFundAccountValidationIDProvider>
                      {/* Provider for the verify account no */}
                      <MemoizedVerifyAccountNoProvider>
                        {/* Provider for the token context */}
                        <MemoizedIsTokenProvider>
                          {/* Provider for the Fund Api re call */}
                          <MemoizedFunAccountApiReCallProvider>
                            {children}
                          </MemoizedFunAccountApiReCallProvider>
                        </MemoizedIsTokenProvider>
                      </MemoizedVerifyAccountNoProvider>
                    </MemoizedFundAccountValidationIDProvider>
                  </MemoizedAppVpainputProvider>
                </MemoizedContactIdProvider>
              </MemoizedAppUpiFundFormDataProvider>
            </MemoizedCognitoUserIdProvider>
          </MemoizedReCallProvider>
        </MemoizedIsAuthenticateProvider>
      </MemoizedCognitoUserProvider>
    </MemoizedInputProvider>
  );
};
