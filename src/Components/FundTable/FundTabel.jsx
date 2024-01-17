import clockimg from "../../assets/clock.png";

/* eslint-disable react/no-unknown-property */
const FundTabel = () => {
  return (
    <>
      <div
        className="flex flex-col  md:flex-row items-center mx-4 md:mx-10 mb-4"
        style={{
          fontFamily: "'Arial', 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        <h2 className="text-2xl  text-black mx-4 mb-2 md:mb-0">
          Recent Cancellation Requests
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
                Order ID
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Time
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                # 121-252-85
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center ">
                <span>
                  <img
                    src={clockimg}
                    alt="Active Icon"
                    className="icon  w-4 h-4 mr-2"
                  />
                </span>
                <span>12 Hours Ago</span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                <span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs">
                  Processing
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                # 121-252-85
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center ">
                <span>
                  <img
                    src={clockimg}
                    alt="Active Icon"
                    className="icon  w-4 h-4 mr-2"
                  />
                </span>
                <span>12 Hours Ago</span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                  Complete
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                # 121-252-85
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center ">
                <span>
                  <img
                    src={clockimg}
                    alt="Active Icon"
                    className="icon  w-4 h-4 mr-2"
                  />
                </span>
                <span>12 Hours Ago</span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                  Faild
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                # 121-252-85
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center ">
                <span>
                  <img
                    src={clockimg}
                    alt="Active Icon"
                    className="icon  w-4 h-4 mr-2"
                  />
                </span>
                <span>12 Hours Ago</span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                <span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs">
                  Processing
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 border-b border-gray-200">
                # 121-252-85
              </td>
              <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center ">
                <span>
                  <img
                    src={clockimg}
                    alt="Active Icon"
                    className="icon  w-4 h-4 mr-2"
                  />
                </span>
                <span>12 Hours Ago</span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 ">
                <span className="bg-yellow-500 text-white py-1 px-2 rounded-full text-xs">
                  Processing
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FundTabel;
