import Login from "../pages/login/Login";
import MarlbruhShell from "./MarlbruhShell";
import { getUserGivenToken } from "../../api/apiCalls";
import { useAuth } from "../../authentication/AuthContext";
import { useEffect, useState } from "react";
import LoginControl from "../pages/login/LoginControl";

const MarlbruhSite = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if (auth.authToken) {
      getUserGivenToken(auth.authToken)
        .then(({ data: user }) => {
          auth.setCurrentUser(user);
          setIsAuthorized(true);
        })
        .catch((err) => {
          console.error(err);
          auth.clearAuthToken();
        });
    } else {
      setIsAuthorized(false);
    }
  }, [auth.authToken]);

  return <>{isAuthorized ? <MarlbruhShell /> : <LoginControl />}</>;
};

export default MarlbruhSite;
