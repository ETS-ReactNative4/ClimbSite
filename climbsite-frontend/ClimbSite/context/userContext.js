import React, { createContext } from "react";

export const AuthContext = createContext({
  authState: { signedIn: false, token: "" },
  setAuthState: () => {},
});
