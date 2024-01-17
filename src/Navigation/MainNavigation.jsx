/* This code is a React component that handles the main navigation of a web application using React
Router. It imports various dependencies and components, including React, React Router, and custom
components. */
import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute/PrivateRoute"; // Importing PrivateRoute component
import { getAuthenticatedUser } from "../../CognitoServices/GetCurrentAuthenticatUser"; // Importing function for fetching authenticated user
import { IsAuthenticateContext } from "../../Context/IsAuthenticateContext"; // Importing IsAuthenticateContext
import { ReCallContext } from "../../Context/ReCallContext"; // Importing ReCallContext
import { CognitoUserIdContext } from "../../Context/CognitoUserIdContext";
import MemoizedSpinner from "../Components/Spinner/Spinner";
import { GetContactIDGetService } from "../../ApiGateWaySerice/GetContactID";
import { ContactIdContext } from "../../Context/ContactIdContext";
import { TokenContext } from "../../Context/TokenContext";

// Lazily loaded components
const LoginPage = lazy(() => import("../Routes/Login/Login"));
const VerifyOpt = lazy(() => import("../Routes/VerfyOpt/VerifyOpt"));
const Dashboard = lazy(() => import("../Routes/DashBoard/Dashboard"));

const MainNavigation = () => {
  // Using the useNavigate hook to handle navigation
  const navigate = useNavigate();

  // State for spinner loader
  const [Loader, setLoader] = React.useState(true);

  // Context - - - - - - - - - - - - - - - - - - - -- - - - - - - - - --

  // Accessing setIsAuth function from IsAuthenticateContext
  const { setIsAuth } = React.useContext(IsAuthenticateContext);

  // Accessing reCall function from ReCallContext
  const { reCall } = React.useContext(ReCallContext);

  // Accessing setcognitoUserId function from CognitoUserIdContext
  const { setcognitoUserId } = React.useContext(CognitoUserIdContext);

  // Accessing setContactID function from ContactIdContext
  const { setContactID } = React.useContext(ContactIdContext);

  // Accesing SetToken and setApikey function form TokenContext
  const { setToken, setApiKey } = React.useContext(TokenContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // fun to set stete to null
  const SetNull = React.useCallback(() => {
    setcognitoUserId(null); // Setting Cognito user id to null

    setToken(null); // setting the jwt auth token to null

    setApiKey(null); // setting the api key to null

    setContactID(null); // setting the contact id to null

    setIsAuth(false); // Setting isAuthenticated to false
  }, []);

  // useCallback for GetUser function
  const getUser = React.useCallback(async () => {
    try {
      const result = await getAuthenticatedUser(); // Fetching authenticated user details
      const { Data, AuthToken, AuthKey } = result; // Destructuring success from the result

      if (Data) {
        const { sub } = Data.attributes; // Destructuring sub from the data.attributes

        setcognitoUserId(sub); // Setting Cognito user id

        setToken(AuthToken); // setting the jwt auth token

        setApiKey(AuthKey); // setting the api key

        try {
          const contactID_Result = await GetContactIDGetService(
            sub,
            AuthToken,
            AuthKey
          ); // Fetching contact ID

          const {
            ContactIdData: {
              data: [{ ContactID }],
            },
          } = contactID_Result; // Destructuring to directly access ContactID

          setContactID(ContactID); // Setting the contact id

          setIsAuth(true); // Setting isAuthenticated to true if the user is authenticated

          navigate("/User/Dashboard"); // Navigating to the Dashboard upon successful authentication
        } catch (error) {
          // invoke set null function
          SetNull();
          console.log(error.message);
        }
      }
    } catch (error) {
      // invoke set null function
      SetNull();
      console.error("Error fetching authenticated user:", error);
      // Additional error handling or logging can be performed here
    } finally {
      setLoader(false); // Setting loader to false after try-catch block execution
    }
  }, [
    setcognitoUserId,
    setToken,
    setApiKey,
    setContactID,
    setIsAuth,
    navigate,
    SetNull,
  ]);

  // Triggering GetUser function when reCall changes
  useEffect(() => {
    getUser();
  }, [reCall]);

  if (Loader) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
        <MemoizedSpinner />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Setting default route to redirect to login */}
        <Route path="/" element={<Navigate to="/Auth/login" replace />} />
        {/* Route for Login page */}
        <Route path="/Auth/login" element={<LoginPage />} />
        {/* Route for OTP verification */}
        <Route path="/Auth/VerifyOpt" element={<VerifyOpt />} />
        {/* Private route for user dashboard */}
        <Route path="/User" element={<PrivateRoute />}>
          {/* Route for the User Dashboard */}
          <Route path="/User/Dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const MemoizedMainNavigation = React.memo(MainNavigation);
export default MemoizedMainNavigation;
