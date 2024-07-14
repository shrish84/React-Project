import { useState } from "react";
import AuthInputs from "./components/AuthInputs.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./Dashboard.jsx";
import { DashboardContext } from "./context.jsx";

export default function App() {
  const [user, setUser] = useState({
    isSubscribed: true,
    name: "You",
  });
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
      </main>
      <DashboardContext.Provider value={user}>
        <Dashboard />
      </DashboardContext.Provider>
    </>
  );
}
