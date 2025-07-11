import { createContext, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("userToken") || null
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );

  return (
    <userContext.Provider
      value={{ UserLogin, setUserLogin, userRole, setUserRole }}
    >
      {props.children}
    </userContext.Provider>
  );
}
