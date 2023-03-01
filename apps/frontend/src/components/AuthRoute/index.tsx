import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../contexts/UserContext";

export const AuthRoute = ({ children }: React.PropsWithChildren) => {
  const [userState, userDispath]: any = useContext(userContext);

  if (!userState.user) {
    return <Navigate to={"/login"} />;
  } else {
    return <>{children}</>;
  }
};
