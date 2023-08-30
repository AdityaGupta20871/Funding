import React from 'react';
import { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

// Create a context for sharing state between components
const StateContext = createContext();

// Define a context provider component
export const StateContextProvider = ({ children }) => {
  // Get an instance of the contract using the useContract hook
  const { contract } = useContract('0xF88fc15C5F86872A74477cC7Ab72513a8C2023f1');

  // Create a function for calling the contract's createCampaign method using the useContractWrite hook
  const { mutateAsync: createCampaign } = useContractWrite('contract', 'createCampaign');

  // Get the user's Ethereum  smart wallet address
  const address = useAddress();

  // Get a function for connecting to the user's MetaMask wallet using the useMetamask hook
  const connect = useMetamask();

  // Define a function for publishing a campaign by calling the contract's createCampaign method with form data
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.desc,
        form.target,
        new Date(form.deadline).getTime() / 100,
        form.imageurl,
      ]);
      console.log('contract call success', data);
    } catch (error) {
      console.log('contract call failure', error);
    }
  };

  // Render the context provider and pass down values to child components via the context
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

// Define a custom hook for accessing the context values
export const useStateContext = () => useContext(StateContext);

