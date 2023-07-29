import React from "react"; // Make sure to import React
import { usePioneer } from "lib/context/Pioneer";
import { useEffect } from "react"; // Remove useState import since it's not used in this component

// You can include the interface here or in a separate file, but for this example, I'll include it here
interface TableProps {
  headers: string[];
  data: any[][];
}

const EvmBalance: React.FC = () => {
  // Assuming usePioneer returns an object with the specified properties
  const { state, dispatch } = usePioneer();
  const { user } = state; // Destructure only the "user" property from the "state" object

  useEffect(() => {
    // Add any side effects or additional logic here if needed
    console.log("EVM: ", user);
  }, [user]); // The effect will be triggered whenever the "user" property changes

  return (
    <div>
      User Data: {JSON.stringify(user)}
    </div>
  ); // Display the user data inside a div element
};

export default EvmBalance;
