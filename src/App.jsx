import React, { useContext, useEffect } from "react";
import { auth } from "./Utility/firebase";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import Routing from "./Router"; // Your main routing component

function App() {
  const [, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser ?? null,
      });
    });

    return () => unsubscribe(); // Correct cleanup
  }, [dispatch]);

  return <Routing />; // Restored routing
}

export default App;
