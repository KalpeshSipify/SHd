/* The above code is a React component called "VerifyOpt". It is a form for verifying an OTP (One-Time
Password) sent to a user's email. */
import React from "react";
import { InputContext } from "../../../Context/InputContext";
import { CognitoUserContext } from "../../../Context/CognitoUserContext";
import { VerifyOptHandler } from "../../../CognitoServices/VeryOtp";
import loginImg from "../../assets/LoginImg.png";
import { ReCallContext } from "../../../Context/ReCallContext";
import MemoizedSpinner from "../../Components/Spinner/Spinner";

const VerifyOpt = () => {
  // State section

  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // State for login attempt
  const [Attempt, setAttempt] = React.useState(0);

  // State for button disable or enable
  const [isButtonDisabled, setbisButtonDisabled] = React.useState(false);

  // State for timer (180 seconds = 3 minutes)
  const [time, setTime] = React.useState(180);

  // State for indicating if the OTP is valid
  const [isValidOtp, setisValidOtp] = React.useState(true);

  // Timer starts automatically
  const [isActive, setIsActive] = React.useState(true);

  // Context section

  // Context for accessing 'setreCall' function from ReCallContext
  const { setreCall } = React.useContext(ReCallContext);

  // Context for accessing 'inputData' and 'handleOnTextChange' from InputContext
  const { inputData, handleOnTextChange, validationErrors } =
    React.useContext(InputContext);

  // Context for accessing 'cognitoUser' from CognitoUserContext
  const { cognitoUser } = React.useContext(CognitoUserContext);

  // Triggering the useEffects on isActive or time changes
  // Timer logic
  React.useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Setting button to false state
      setbisButtonDisabled(true);
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Memoized function to format time
  const formatTime = React.useMemo(
    () => (sec) => {
      if (sec <= 0) {
        return "Time Out";
      }

      const minutes = Math.floor(sec / 60);
      const seconds = sec % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
    []
  );

  // Handler for VerifyOpt
  const HANDLE_VERIFY_OPT_DELAY = 1500; // Delay constant for timeouts

  const HandleVerifyOpt = React.useCallback(async () => {
    // Check if attempts are more than 1, disable button
    if (Attempt > 1) {
      setbisButtonDisabled(true); // Disable button for more than 1 attempt
      return; // Exit early for invalid attempts
    }

    try {
      setLoader(true); // Activate loader before verification

      const { answer } = inputData; // Extract answer from input data

      const verifyOptResult = await VerifyOptHandler(cognitoUser, answer); // Call verification function

      const { success } = verifyOptResult; // Destructure result

      if (success) {
        setreCall((prev) => !prev); // Toggle recall flag
      } else {
        setisValidOtp(false); // Set OTP validity to false

        setTimeout(() => {
          setisValidOtp(true); // Set OTP validity back to true after delay
        }, HANDLE_VERIFY_OPT_DELAY);

        console.log("Failed to verify OTP."); // Log failure to verify OTP
      }
    } catch (error) {
      console.error("Error:", error.message || "Internal Server Error!"); // Handle and log errors
    } finally {
      setLoader(false); // Deactivate loader after verification attempt
    }
  }, [Attempt, inputData, cognitoUser, setreCall]);

  return (
    <>
      {/* Loader component */}
      {Loader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <MemoizedSpinner />
        </div>
      )}

      {/* Main content */}
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-row flex-col sm:flex-row">
          {/* Left section */}
          <div className="w-full sm:w-2/5 h-1/2 sm:h-full bg-white flex justify-center items-center">
            {/* Login form container */}
            <div className="w-5/6 lg:w-4/5 xl:w-3/5 h-auto lg:h-96 rounded-lg bg-white flex flex-col items-center">
              {/* Title */}
              <div className="w-5/6 flex items-center">
                <p className="font-semibold text-3xl text-indigo-700">
                  Self Help Dashboard
                </p>
              </div>
              {/* Instructions */}
              <div className="w-5/6 flex items-center mt-2">
                <p className="text-sm text-black">
                  Enter Login OTP sent to your e-mail
                </p>
              </div>
              {/* OTP input */}
              <div className="w-5/6 flex items-center mt-8">
                <p className="text-sm text-black">OTP</p>
              </div>
              {/* OTP input field */}
              <div className="w-5/6 flex flex-col items-center mt-2">
                <input
                  name="answer"
                  type="text"
                  placeholder="Enter Otp"
                  onChange={handleOnTextChange}
                  className="w-full h-12 border-2 border-indigo-700 rounded text-center focus:outline-none text-sm"
                />
                {/* Validation errors */}
                <div className="text-red-500 text-sm">
                  {validationErrors.answer && <p>{validationErrors.answer}</p>}
                  {!isValidOtp && <p>Inavlid Opt.</p>}
                </div>
              </div>
              {/* Login button */}
              <div className="w-5/6 flex items-center mt-6 justify-center">
                <button
                  onClick={HandleVerifyOpt}
                  disabled={isButtonDisabled}
                  className={`w-full lg:w-5/6 h-10 border-indigo-700 font-semibold text-white rounded-full ${
                    isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-800 hover:bg-indigo-900"
                  } focus:outline-none`}
                >
                  Login
                </button>
              </div>
              {/* Attempted login count */}
              <div className="w-5/6 flex items-center justify-center mt-10">
                <p className="font-semibold text-1xl text-black-700">
                  Attempted: {Attempt === 3 ? "Limit Exceeded" : Attempt}
                </p>
              </div>
              {/* Time left */}
              <div className="w-5/6 flex items-center justify-center mt-2">
                <p className="font-semibold text-2xl text-black-700">
                  Time Left: {formatTime(time)}
                </p>
              </div>
            </div>
          </div>
          {/* Right section */}
          <div className="w-full h-1/2 sm:h-full sm:w-3/5 bg-white">
            <img
              src={loginImg} // Replace with your image source
              alt=""
              className="w-full h-full "
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MemoizedVerifyOpt = React.memo(VerifyOpt);
export default MemoizedVerifyOpt;
