/* The above code is a React component that represents a menu for a dashboard. It includes navigation
links to different pages, such as adding a fund account, placing an order, managing refund requests,
viewing account details, and logging out. It also includes icons for chat and notifications, as well
as a link for help and support. The code uses React hooks and context to manage state and handle
user authentication. */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IsAuthenticateContext } from "../../../Context/IsAuthenticateContext";
import { LogOutHandler } from "../../../CognitoServices/SignOut";
import chatimg from "../../assets/chat.png";
import notificationimg from "../../assets/notification.png";
import { AppUpiFundFormDataContext } from "../../../Context/AppUpiFundFormDataContext";
import { CognitoUserIdContext } from "../../../Context/CognitoUserIdContext";
import MemoizedSpinner from "../Spinner/Spinner";
import { TokenContext } from "../../../Context/TokenContext";

const Menu = () => {
  // Using useNavigate hook for navigation to another page
  const navigation = useNavigate();

  // State for responsive menu open
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // Context for handling user authentication
  const { setIsAuth } = React.useContext(IsAuthenticateContext);

  //  context for  accessig the set auth token function form api key for token conteext
  const { setToken, setApiKey } = React.useContext(TokenContext);

  // Context for managing UPI fund account input data
  const { setUpiFundFrominputData, UpiFundFrominputData } = React.useContext(
    AppUpiFundFormDataContext
  );

  // Context for managing Cognito user ID
  const { cognitoUserId, setcognitoUserId } =
    React.useContext(CognitoUserIdContext);

  // Memoized logout handler function for Cognito
  const handleLogout = React.useCallback(async () => {
    setLoader(true); // Setting loader to true, indicating the start of an asynchronous operation

    try {
      const result = await LogOutHandler();

      // Destructure the result to get the 'success' property
      const { success } = result;

      // Check if the logout was successful
      if (success) {
        // Delay for responsive navigation for 1.5 seconds
        setTimeout(() => {
          setApiKey(null); // set api key to null

          setToken(null); // set token to null

          setcognitoUserId(null); // Set cognito user id to null after logout

          setIsAuth(false); // Set isAuth to false to restrict access

          navigation("/Auth/login"); // Navigate to the login page

          setLoader(false); // Setting loader to false, indicating the end of the asynchronous operation
        }, 1500);
      } else {
        // Handle the case where the logout was not successful
        // You may show an error message or implement different logic based on your application requirements
      }
    } catch (error) {
      setLoader(false); // Setting loader to false in case of an error
      // Handle any potential errors that occur during logout
      console.error("Error during logout:", error);
      // Optionally, you can show an error message or perform other error handling logic here
    }
  }, [navigation, setApiKey, setIsAuth, setToken, setcognitoUserId]);

  // Memoized set user ID handler function
  const handleSetUserID = React.useCallback(() => {
    // Destructuring to get the UserId from upiFundFrominputData
    const { UserId } = UpiFundFrominputData;

    // Check if UserId is not set
    if (!UserId) {
      // Update the state using the updater function to ensure the correct previous state
      setUpiFundFrominputData((prevState) => ({
        ...prevState, // Maintain previous state
        UserId: cognitoUserId, // Set UserId to cognitoUserId
      }));
    }
  }, [UpiFundFrominputData, setUpiFundFrominputData, cognitoUserId]);

  return (
    <>
      {/* Loader component */}
      {Loader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <MemoizedSpinner />
        </div>
      )}
      <div className="h-auto lg:min-h-screen flex flex-col lg:flex-row bg-white">
        <div className="lg:w-56 bg-white overflow-hidden">
          <div className="flex items-center justify-between lg:items-center lg:h-20 shadow-md relativ ">
            <h1
              onClick={() => {
                setIsMenuOpen(false);
                navigation("/User/Dashboard/FundAccounts");
              }}
              className="font-semibold text-2xl text-indigo-700 px-4 lg:px-10 cursor-pointer"
            >
              Dashboard
            </h1>
            <div className="flex lg:hidden">
              <button
                className="px-3 py-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
                <div className="w-6 h-0.5 bg-black my-1"></div>
              </button>
            </div>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:block lg:relative lg:flex-col lg:w-full bg-white rounded-r-3xl overflow-hidden`}
          >
            <ul className="flex flex-col py-4">
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      to="/User/Dashboard/FundAccounts"
                    >
                      Fund Account List
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                        handleSetUserID();
                      }}
                      to="/User/Dashboard/UpiID_Validation"
                    >
                      Add Fund Account
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      to="/User/Dashboard/Order"
                    >
                      Order
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      to="/User/Dashboard/RecentCancellationRequest"
                    >
                      Refund Request
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      to="/User/Dashboard/FundTable"
                    >
                      My Account
                    </Link>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <Link onClick={handleLogout}>Logout</Link>
                  </span>
                </div>
              </li>

              <li>
                <div className="flex flex-row items-center h-12 text-gray-500 hover:text-gray-800 mt-4 sm:mt-8 md:mt-16 lg:mt-56">
                  <div className="flex  px-14 ">
                    <div className="flex items-center justify-center h-12 w-9  ">
                      <img
                        src={chatimg}
                        alt="First Image"
                        className="max-h-full max-w-full cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-center h-12 w-9 ml-2 ">
                      <img
                        src={notificationimg}
                        alt="Second Image"
                        className="max-h-full max-w-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-row items-center h-12  text-gray-500 hover:text-gray-800">
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">
                    <a>Help & Support</a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
