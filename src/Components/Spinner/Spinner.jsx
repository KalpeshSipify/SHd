/**
 * The code exports a React component called "Spinner" that displays a loading animation.
 * @returns The Spinner component is being returned.
 */
import React from "react";

// Spinner component for displaying a loading animation
const Spinner = () => {
  return (
    <div className="relative">
      <div className="border-t-4 border-b-4 rounded-full w-16 h-16 animate-ping"></div>
    </div>
  );
};

const MemoizedSpinner = React.memo(Spinner);
export default MemoizedSpinner;
