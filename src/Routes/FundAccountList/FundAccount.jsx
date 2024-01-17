import React from "react";
import { ContactIdContext } from "../../../Context/ContactIdContext";
import { GetFundAccountGetService } from "../../../ApiGateWaySerice/GetFundAccountList";
import List from "../../Components/List/List";
import MemoizedSpinner from "../../Components/Spinner/Spinner";
import { TokenContext } from "../../../Context/TokenContext";
import { FunAccountApiReCallContext } from "../../../Context/FunAccountApiReCallContext";
// import { FunAccountApiReCallContext } from "../../../Context/FunAccountApiReCallContext";

const FundAccount = () => {
  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // State for managing the fund list obtained from the API
  const [fundList, setfundList] = React.useState([]);

  // Context for accessing the user's contact ID
  const { ContactID } = React.useContext(ContactIdContext);

  // context for Accesseing the auth token and api key
  const { ApiKey, Token } = React.useContext(TokenContext);

  //  Contex for accessing the FundApi Recall State
  const { FundApireCall } = React.useContext(FunAccountApiReCallContext);

  // useEffect for initiating the API call to get all fund accounts list
  React.useEffect(() => {
    // Api Call Handler Function for fetching fund accounts based on the ContactID
    const GetFundAccoutHandler = async () => {
      try {
        // set the loader to True
        setLoader(true);

        // Calling GetFundAccountGetService API with the ContactID
        const {
          Data: { data },
        } = await GetFundAccountGetService(ContactID, Token, ApiKey);

        // Setting the fetched fund list to the state
        setfundList(data);

        // setting the loader to false
        setLoader(false);
      } catch (error) {
        //  setting the loader to false
        setLoader(false);
        console.error("Error in GetFundAccoutHandler:", error);
        // You might want to perform additional error handling or logging here
      } finally {
        // setting the loader to false
        setLoader(false);
      }
    };

    GetFundAccoutHandler();
  }, [ContactID, FundApireCall]);

  return (
    <>
      {/* Loader component */}
      {Loader && (
        /* Loader overlay */
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <MemoizedSpinner />
          {/* Assuming Spinner is a component showing a loading indicator */}
        </div>
      )}

      <div
        className="flex flex-col  md:flex-row items-center mx-4 md:mx-10 mb-4"
        style={{
          fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        <h2 className="text-2xl  text-black mx-4 mb-2 md:mb-0">
          Fund Account List
        </h2>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-indigo-700 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-700 rounded-full ml-1"></div>
          <div className="w-2 h-2 bg-indigo-700 rounded-full ml-1"></div>
        </div>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-indigo-700">
              <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Account Name
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Vpa
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Default
              </th>
            </tr>
          </thead>
          {fundList &&
            fundList.map((item, index) => <List key={index} item={item} />)}
        </table>
      </div>
    </>
  );
};

export default FundAccount;
