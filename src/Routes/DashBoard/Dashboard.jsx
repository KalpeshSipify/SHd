/**
 * The code is a React component that renders a dashboard with a menu and different routes for
 * different paths.
 * @returns The Dashboard component is returning a JSX element. It consists of a main container div
 * with two child divs - a left sidebar and a right content area. The left sidebar contains a Menu
 * component, while the right content area contains the routing for different paths using the
 * react-router-dom library. The default route is set to redirect to
 * "/User/Dashboard/RecentCancellationRequest". There are two other routes defined
 */
import { Navigate, Route, Routes } from "react-router-dom";
import Menu from "../../Components/Menu/Menu";
import React from "react";
import MemoizedUpiFundForm from "../../Components/AddUpiFundForm/UpiFundForm";
import MemoizedUpiIDValidationForm from "../../Components/UpiIDValidationForm/UpiIDValidationForm";
import FundAccount from "../FundAccountList/FundAccount";

// Dashboard component rendering menu and routes
const Dashboard = () => {
  return (
    <>
      {/* Main container */}
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-full h-full flex flex-col sm:flex-row">
          {/* Left sidebar */}
          <div className="w-full sm:w-1/5 bg-red">
            <div className="h-auto flex-grow flex flex-col">
              {/* Menu component */}
              <Menu />
            </div>
          </div>
          {/* Right content area */}
          <div className="w-full sm:w-4/5 bg-white flex flex-col items-center justify-center sm:items-start sm:justify-start sm:pl-10 sm:pt-10">
            {/* Routing for different paths */}
            <Routes>
              {/* Default route */}
              <Route
                path="/"
                element={<Navigate to="/User/Dashboard/FundAccounts" />}
              />
              {/* Route for UPI Fund Account */}
              <Route
                path="/UpiID_Validation"
                element={<MemoizedUpiIDValidationForm />}
              />
              <Route
                path="/Add_Fund_Acccount"
                element={<MemoizedUpiFundForm />}
              />
              {/* Route for Recent Cancellation Requests */}
              <Route path="/FundAccounts" element={<FundAccount />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

// Memoizing Dashboard component
const MemoizedDashboard = React.memo(Dashboard);

// Exporting MemoizedDashboard component
export default MemoizedDashboard;
