import { useLocalStorage } from "@mantine/hooks";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type AuthContextType = {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  clearAuthToken: () => void;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken, clearAuthToken] = useLocalStorage({
    key: "marlbruh-auth",
  });

  const [currentUser, setCurrentUser] = useState(undefined as User | undefined);
  const authContextValue = {
    authToken,
    setAuthToken,
    clearAuthToken,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthContext");
  }
  return auth;
}
