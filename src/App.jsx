import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import { useNavigation } from "react-router";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const navigation = useNavigation();
  return (
    <div>
      <Header />
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
    </div>
  );
}

export default App;
