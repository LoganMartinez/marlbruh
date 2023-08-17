import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const LoginControl = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <>
      {showRegistration ? (
        <Register setShowRegistration={setShowRegistration} />
      ) : (
        <Login setShowRegistration={setShowRegistration} />
      )}
    </>
  );
};

export default LoginControl;
