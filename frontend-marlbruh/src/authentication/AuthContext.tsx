import { useLocalStorage } from "@mantine/hooks";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type AuthContextBaseType = {
  authToken: string | undefined;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  clearAuthToken: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export type AuthContextTokenNotRequired = {
  authToken: string | undefined;
  currentUser: User | undefined;
} & AuthContextBaseType;

export type AuthContextTokenRequired = {
  authToken: string;
  currentUser: User;
} & AuthContextBaseType;

const AuthContext = createContext<AuthContextTokenNotRequired | undefined>(
  undefined
);

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

export function useAuthWithoutToken() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuthWithoutToken must be used within AuthContext");
  }
  return auth;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthContext");
  }
  if (!auth.authToken) {
    throw new Error(
      "useAuth was used but authToken is not set. Maybe you meant to use useAuthWithoutToken?"
    );
  }
  if (!auth.currentUser) {
    throw new Error(
      "useAuth was used but currentUser is not set. Maybe you meant to use useAuthWithoutToken?"
    );
  }
  return auth as AuthContextTokenRequired;
}
