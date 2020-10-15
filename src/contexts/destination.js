import { createContext, useState } from 'react';

export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [ destination, setDestination ] = useState('/');

  console.log('destination: ', destination);

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  )
}