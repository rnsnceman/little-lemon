import { Flex, useMediaQuery } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

const PropsContext = createContext();

const LoadingSpinner = () => (
  <Flex
    id="loading"
    alignItems="center"
    justifyContent="center"
    width="100vw"
    height="100vh"
  >
    <img alt="logo" src="/favicon.ico" style={{ width: 100 }} />
  </Flex>
);

export const ContextProvider = ({ children }) => {
  const [mobile] = useMediaQuery("(max-width: 885px)", { ssr: false });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contextValue = { mobile };

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <PropsContext.Provider value={contextValue}>
      {children}
    </PropsContext.Provider>
  );
};

export const useProps = () => {
  const context = useContext(PropsContext);
  if (context === undefined) {
    throw new Error("useProps must be used within a ContextProvider");
  }
  return context;
};
