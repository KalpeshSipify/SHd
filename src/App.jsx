/* The code is importing the `MainContextProvider` component from the "../Context/MainContext" file and
the `MemoizedMainNavigation` component from the "./Navigation/MainNavigation" file. */
import { MainContextProvider } from "../Context/MainContext";
import MemoizedMainNavigation from "./Navigation/MainNavigation";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <MainContextProvider>
          <MemoizedMainNavigation />
        </MainContextProvider>
      </div>
    </>
  );
}

export default App;
